# React Test Provider Wrapper サンプル

このパッケージは、React アプリケーションのテスト時に使用する provider wrapper の実装例です。

## 含まれるプロバイダー

- **Redux Store**: `@reduxjs/toolkit` を使用した状態管理（Todoの例を含む）
- **React Query**: `@tanstack/react-query` を使用したデータフェッチング
- **OpenFeature**: `@openfeature/react-sdk` を使用した機能フラグ

## プロジェクト構成

```bash
├── features/
│   └── todo/
│       └── todoSlice.ts    # Todo機能のReduxスライス
├── hooks.ts                # 型安全なReact-Reduxフック
├── provider.tsx            # テスト用プロバイダーラッパー
├── test-utils.tsx          # テスト用ユーティリティ関数
├── store.ts                # Reduxストアの設定
├── preloadedState.ts       # テスト用の初期状態
└── tsconfig.json           # TypeScript設定
```

## 使用方法

### 基本的な使用方法

```tsx
import { renderWithProviders } from '@repo/react-test-provider-wrapper-example/test-utils';
import { MyComponent } from './MyComponent';

test('コンポーネントが正しくレンダリングされる', () => {
  renderWithProviders(<MyComponent />);
  // テストロジック
});
```

### 初期状態を指定してテスト

```tsx
test('Todo初期状態を指定してテスト', () => {
  const preloadedState = {
    todos: [
      { text: 'テストタスク1', completed: false },
      { text: 'テストタスク2', completed: true }
    ]
  };

  renderWithProviders(<TodoList />, { preloadedState });
  // テストロジック
});
```

### 機能フラグを指定してテスト

```tsx
test('機能フラグが有効な場合のテスト', () => {
  const flagValueMap = {
    'new-feature': true,
    'beta-ui': false
  };

  renderWithProviders(<MyComponent />, { flagValueMap });
  // テストロジック
});
```

### カスタムストアを使用

```tsx
test('カスタムストアを使用したテスト', () => {
  const customStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(customMiddleware),
  });

  // 先にdispatchしておくことも可能
  // customStore.dispatch(someAction());

  renderWithProviders(<MyComponent />, { store: customStore });
  // テストロジック
});
```

## 型安全なフック

```tsx
import { useAppDispatch, useAppSelector } from './hooks';

function TodoComponent() {
  const todos = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  // 型安全にReduxを使用
}
```

## ファイル詳細

### provider.tsx

- 複数のプロバイダーをラップするコンポーネント
- QueryClientを毎回新規作成してテスト間の状態をクリーンに保つ
- preloadedStateまたはcustomStoreを受け取り可能

### test-utils.tsx

- `renderWithProviders`関数を提供
- Testing Library の render 関数をラップ

### store.ts

- Redux ストアの設定
- 型安全なRootStateとAppDispatchを export

### preloadedState.ts

- テスト用のデフォルト初期状態
- Todo の例が含まれる

## 参考資料

- [Redux Toolkit - Usage with Next.js](https://redux-toolkit.js.org/usage/nextjs)
- [Testing Library - Custom Render](https://testing-library.com/docs/react-native-testing-library/setup/#custom-render)
- [React Redux - Writing Tests](https://redux.js.org/usage/writing-tests)
- [TanStack Query - Testing](https://tanstack.com/query/latest/docs/framework/react/guides/testing)
