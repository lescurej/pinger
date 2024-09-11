import { Store } from "@tauri-apps/plugin-store";
import { nanoid } from "nanoid";
import { create } from "zustand";
import { persist, createJSONStorage, StateStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const defaultPingInstance = {
  label: "New label",
  ip: "127.0.0.1",
};

export type TPingInstance = typeof defaultPingInstance;

export type TDefaultState = {
  pingRateTime: number;
  instances: { [uuid: string]: TPingInstance };
};

const defaultState = {
  pingRateTime: 0.5,
  instances: {},
} as TDefaultState;

const store = new Store("coucou.dat");
const mainKey = "Pinger";

const storage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await store.get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await store.set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await store.delete(name);
  },
};

type State = {
  state: TDefaultState;
  addNewInstance: () => void;
  removeInstance: (uuid: string) => void;
  changeLabel: (uuid: string, value: string) => void;
  changeIP: (uuid: string, value: string) => void;
  changePingRate: (value: number) => void;
  import: (newState: TDefaultState) => void;
  export: () => TDefaultState;
  removeAll: () => void;
};

export const usePingerStore = create<State>()(
  persist(
    immer((set, get) => ({
      state: { ...defaultState },
      addNewInstance: () =>
        set(({ state }) => {
          const uuid = nanoid();
          state.instances[uuid] = { ...defaultPingInstance };
        }),
      removeInstance: (uuid: string) => {
        if (uuid in get().state.instances) {
          set(({ state }) => {
            delete state.instances[uuid];
          });
        }
      },
      changeLabel: (uuid: string, value: string) => {
        if (uuid in get().state.instances) {
          set(({ state }) => {
            state.instances[uuid].label = value;
          });
        }
      },
      changeIP: (uuid: string, value: string) => {
        if (uuid in get().state.instances) {
          set(({ state }) => {
            state.instances[uuid].ip = value;
          });
        }
      },
      import: (newState: TDefaultState) => {
        set(({ state }) => {
          console.log("from import", newState);
          Object.assign(state, newState);
        });
      },
      export: () => {
        return get().state;
      },
      removeAll: () => {
        set(({ state }) => {
          state.instances = {};
        });
      },
      changePingRate: (value: number) =>
        set(({ state }) => {
          state.pingRateTime = value;
        }),
    })),
    {
      name: mainKey, // name of item in the storage (must be unique)
      storage: createJSONStorage(() => storage), // (optional) by default the 'localStorage' is used
    }
  )
);
