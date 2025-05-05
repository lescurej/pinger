// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use getifaddrs::getifaddrs;
use serde::Serialize;
use std::process::Command;
use tauri::Emitter;

#[derive(Serialize, Debug, Clone)]
struct ArpResult {
    ip: String,
    mac: String,
}

#[derive(Serialize)]
struct InterfaceInfo {
    name: String,
    ip: String,
    netmask: String,
}

#[tauri::command]
fn list_network_interfaces() -> Vec<InterfaceInfo> {
    let mut interfaces = Vec::new();
    if let Ok(ifaces) = getifaddrs() {
        for iface in ifaces {
            if let std::net::IpAddr::V4(ip) = iface.address {
                if !ip.is_loopback() {
                    interfaces.push(InterfaceInfo {
                        name: iface.name,
                        ip: ip.to_string(),
                        netmask: iface.netmask.map(|m| m.to_string()).unwrap_or_default(),
                    });
                }
            }
        }
    }
    interfaces
}

// Adapter ce parsing selon ton OS (ici macOS/Linux)
fn parse_arp_line(line: &str) -> Option<(String, String)> {
    // Exemple macOS : ? (192.168.1.1) at 00:11:22:33:44:55 on en0 ifscope [ethernet]
    let parts: Vec<&str> = line.split_whitespace().collect();
    if parts.len() > 4 && parts[1].starts_with('(') && parts[1].ends_with(')') && parts[3] == "at" {
        let ip = parts[1].trim_matches(|c| c == '(' || c == ')').to_string();
        let mac = parts[4].to_string();
        Some((ip, mac))
    } else {
        None
    }
}

#[tauri::command]
async fn scan_nmap_stream(app_handle: tauri::AppHandle, subnet: String) {
    use std::sync::Arc;
    use std::sync::Mutex;

    // Récupère l'IP locale à exclure
    let mut local_ip: Option<String> = None;
    if let Ok(ifaces) = getifaddrs() {
        for iface in ifaces {
            if let std::net::IpAddr::V4(ip) = iface.address {
                if !ip.is_loopback() {
                    let ip_str = ip.to_string();
                    if ip_str.starts_with(&subnet.trim_end_matches(".0/24")) {
                        local_ip = Some(ip_str);
                        break;
                    }
                }
            }
        }
    }

    // Pour éviter les doublons
    let sent_ips = Arc::new(Mutex::new(std::collections::HashSet::new()));

    // Ping chaque IP et envoie le résultat dès qu'il est trouvé
    let handles: Vec<_> = (1..=254)
        .map(|i| {
            let subnet = subnet.clone();
            let app_handle = app_handle.clone();
            let local_ip = local_ip.clone();
            let sent_ips = Arc::clone(&sent_ips);
            std::thread::spawn(move || {
                let ip = format!("{}.{}", subnet.trim_end_matches(".0/24"), i);
                let _ = Command::new("ping")
                    .arg("-c")
                    .arg("1")
                    .arg("-W")
                    .arg("1")
                    .arg(&ip)
                    .output();

                // Lis la table ARP pour cette IP
                let output = Command::new("arp").arg("-n").arg(&ip).output().ok()?;
                let stdout = String::from_utf8_lossy(&output.stdout);
                for line in stdout.lines() {
                    if let Some((found_ip, mac)) = parse_arp_line(line) {
                        if Some(&found_ip) != local_ip.as_ref() {
                            let mut sent = sent_ips.lock().unwrap();
                            if sent.insert(found_ip.clone()) {
                                let _ = app_handle.emit(
                                    "new_ip",
                                    ArpResult {
                                        ip: found_ip.clone(),
                                        mac: mac.clone(),
                                    },
                                );
                            }
                        }
                    }
                }
                Some(())
            })
        })
        .collect();

    for h in handles {
        let _ = h.join();
    }
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            greet,
            list_network_interfaces,
            scan_nmap_stream,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
