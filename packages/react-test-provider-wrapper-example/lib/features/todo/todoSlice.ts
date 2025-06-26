import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface Todo {
  text: string
  completed: boolean
}

const initialState = [] satisfies Todo[] as Todo[]

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload)
    },
    toggle: (state, action: PayloadAction<number>) => {
      const todo = state[action.payload]
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
})

export const { add, toggle } = todosSlice.actions
export default todosSlice.reducer
