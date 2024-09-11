import "./App.css";
import "./scrollbar.css";
import TopBar from "./Components/TopBar/TopBar";
import MainWindow from "./Components/MainWindow/MainWindow";

function App() {
  return (
    <>
      <div style={{ height: "50px" }}>
        <TopBar />
      </div>
      <div className="line" />
      <div style={{ width: "100%", height: "100%", overflowY: "scroll" }}>
        <MainWindow />
      </div>
    </>
  );
}

export default App;
