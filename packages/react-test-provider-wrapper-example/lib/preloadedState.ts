import type { RootState } from './store'

export const preloadedState: RootState = {
  todos: [{ text: 'Learn React Testing Library', completed: false }],
  // テスト用の初期状態をここに追加
}
