// zustand
import { create } from 'zustand'
// [Day25]我的 react 學習記錄 — Zustand
// 引入 create 來建立一個 store，用來貯存狀態跟改變狀態用的 object，object 裡面則會有狀態的 value 跟改變他的 function
// create 這個 function 接收一個 function，這個 function 會接到一個 set function，透過 set function 來更新我們的 state，透過這個 set function 來更新 state 的方式就好像我們透過 setState((state) => newState) 的方式相同，需要回傳一個新的 value。
// https://medium.com/@Hsu.Yang-Min/day25-%E6%88%91%E7%9A%84-react-%E5%AD%B8%E7%BF%92%E8%A8%98%E9%8C%84-zustand-81fd9abfb4e

export const useCountStore = create((set) => ({
    // 可以定義多個 state 的值
    count: 0,
    count2: 10,

    // dispatch 方法可以接傳入值 by 動態來做變化；set((state) => ...) 有點類似 update function 先取得目前的值再做計算變化；也可以單純用 static 靜態的值做變化
    increase: (by) => set((state) => ({ count: state.count + by })),
    increaseTwoCount: (by) => set((state) => ({ count: state.count + by, count2: state.count2 + by })),
    resetCount: () => set({ count: 0, count2: 10 }), // static 靜態的值來做變化

    // 兩種函式寫法都可以
    // increaseDouble: () => set((state) => ({ count: state.count * 2 })),
    increaseDouble: function () {
        return set((state) => ({ count: state.count * 2, count2: state.count2 * 2 }))
    },
}))

export const useNumberStore = create((set) => ({
    number: 0,
    increase: (by) => set((state) => ({ number: state.number + by })),
    resetNumber: () => set({ number: 0 }),
}))

// 處理非同步的寫法
// set 是用來更新我們的狀態，get 則是可以在任何地方取得目前最新的狀態。
// 透過 Zustand 就可以做到把狀態跟元件分開，在狀態的檔案裡面專心處理取得資料跟更新狀態的邏輯，然後元件的地方依照不同的狀態顯示畫面。
export const useDataStore = create()((set, get) => ({
    data: [],
    status: 'Idle',

    // 兩種函式寫法都可以
    getData: async (query) => {
        set({ status: 'Loading', data: [] })
        console.log('get', get()) // status 是 Loading，data 是空陣列。get() 裡面的內容，都會是當前最新的狀態
        const res = await fetch(`https://api.github.com/search/repositories?q=${query}`)
        const data = await res.json()

        set({ status: 'Success', data: data.items })
        console.log('get', get()) // status 是 Success，data 內有資料
    },
    // getData: async function (query) {
    //     set({ status: 'Loading', data: [] })
    //     const res = await fetch(`https://api.github.com/search/repositories?q=${query}`)
    //     const data = await res.json()
    //     set({ status: 'Success', data: data.items })
    // },
}))

// TS 寫法
// export interface CountState {
//   count: number;
//   increase: (by: number) => void;
//   resetCount: () => void;
// }

// export interface NumberState {
//   number: number;
//   increase: (by: number) => void;
//   resetNumber: () => void;
// }

// export const useCountStore = create<CountState>()((set) => ({
//   count: 0,
//   increase: (by) => set((state) => ({ count: state.count + by })),
//   resetCount: () => set({ count: 0 }),
// }));

// export const useNumberStore = create<NumberState>()((set) => ({
//   number: 0,
//   increase: (by) => set((state) => ({ number: state.number + by })),
//   resetNumber: () => set({ number: 0 }),
// }));

// 處理非同步的寫法
// type Data = {
//     id: string;
//     full_name: string;
//     html_url: string;
//   };

//   export interface DataState {
//     data: Data[];
//     status: string;
//     getData: (query: string) => void;
//   }
//   export const useDataStore = create<DataState>()((set, get) => ({
//     data: [],
//     status: "Idle",
//     getData: async (query) => {
//     set({ status: "Loading", data: [] });
//       console.log("get", get());
//       const res = await fetch(
//         `https://api.github.com/search/repositories?q=${query}`
//       );
//       const data = await res.json();

//       set({ status: "Success", data: data.items });
//       console.log("get", get());
//     },
//   }));
