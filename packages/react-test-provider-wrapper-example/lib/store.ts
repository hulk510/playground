import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo/todoSlice'

export const reducer = {
  todos: todoReducer,
}

export const makeStore = () => {
  return configureStore({
    reducer,
    // 他の設定をここに追加
  })
}

export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
