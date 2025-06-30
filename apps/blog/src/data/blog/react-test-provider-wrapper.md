---
pubDatetime: 2025-06-26T13:57:51.484Z
title: 'React Testing: ProviderWrapperを作ってテスト環境を楽にしてみた'
featured: true
draft: false
tags:
  - test
  - react
  - redux
description: React でテストを書くときに複数のプロバイダーを毎回書くのがめんどくさかったので、ProviderWrapper を作ってテストとStorybookで使い回せるようにしてみました。
toc: true
---

## 何を作ったのか

React でテストを書くとき、Redux や React Query、機能フラグなどのプロバイダーを毎回セットアップするのがめんどくさい！という問題に遭遇しました。

そこで `ProviderWrapper` というものを作って、テストでもStorybookでも同じモック環境を使い回せるようにしてみました。

結果的に、テストを書くのがだいぶ楽になったので、その実装を共有してみます。

- [GitHub リポジトリ](https://github.com/hulk510/playground/tree/main/packages/react-test-provider-wrapper-example)

## 何がめんどくさかったのか

テストを書くたびに毎回こんなことをやってました：

- Redux Store の初期化
- React Query Client のセットアップ
- 機能フラグのモック設定
- それぞれのプロバイダーでコンポーネントをラップ

これを毎回書くのは流石にしんどいし、コピペしてると微妙に設定が違ったりして、テスト間で予期しない動作の違いが出ることもありました。

あと、Storybookでも同じような設定が必要で、テストとStorybookで設定が違ってしまうこともよくありました。

## 実装してみたもの

### ProviderWrapper の実装

```tsx
// mockProvider.tsx
import { OpenFeatureTestProvider } from '@openfeature/react-sdk'
import { configureStore } from '@reduxjs/toolkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { RenderOptions } from '@testing-library/react'
import type { JSX, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { preloadedState as mockPreloadedState } from './lib/preloadedState'
import { type RootState, reducer } from './lib/store'

export const setupTestStore = (
  preloadedState?: Partial<RootState> | undefined,
) => {
  // デフォルトのpreloadedStateと部分的なpreloadedStateをマージ
  const mergedPreloadedState: RootState = {
    ...mockPreloadedState,
    ...preloadedState,
  }

  return configureStore({
    reducer,
    preloadedState: mergedPreloadedState,
  })
}

export type TestStore = ReturnType<typeof setupTestStore>

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState> | undefined
  store?: TestStore
  flagValueMap?: Record<string, boolean | string | number>
}

export function ProviderWrapper({
  children,
  preloadedState = mockPreloadedState,
  store = setupTestStore(preloadedState),
  flagValueMap = {},
}: PropsWithChildren<ExtendedRenderOptions>): JSX.Element {
  // ⚠️ ここ重要：QueryClientを毎回新規作成してテスト間の汚染を防ぐ
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // テストでは失敗したときリトライしない
      },
    },
  })

  return (
    <OpenFeatureTestProvider flagValueMap={flagValueMap}>
      <QueryClientProvider client={testQueryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </OpenFeatureTestProvider>
  )
}
```

### テスト用のヘルパー関数

```tsx
// test-utils.tsx
import { render } from '@testing-library/react'
import type React from 'react'
import type { PropsWithChildren } from 'react'
import type { ExtendedRenderOptions } from './mockProvider'
import { ProviderWrapper } from './mockProvider'

export function renderWithProviders(
  ui: React.ReactElement,
  options: ExtendedRenderOptions = {},
) {
  const { store, ...renderOptions } = options
  const Wrapper = (props: PropsWithChildren<ExtendedRenderOptions>) => (
    <ProviderWrapper {...props} {...renderOptions} store={store} />
  )
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
```

## ここがポイント：部分的なState更新

個人的に一番気に入ってるのが、`setupTestStore` の実装です。

```tsx
export const setupTestStore = (
  preloadedState?: Partial<RootState> | undefined,
) => {
  // デフォルトのpreloadedStateと部分的なpreloadedStateをマージ
  const mergedPreloadedState: RootState = {
    ...mockPreloadedState,
    ...preloadedState,
  }

  return configureStore({
    reducer,
    preloadedState: mergedPreloadedState,
  })
}
```

`Partial<RootState>` にしてあるので、テストで必要な部分だけを指定できます。指定されなかった部分は、デフォルトの `mockPreloadedState` の値が使われるので、毎回全部の状態を定義する必要がありません。

これがないと、例えばtodosだけテストしたいのに、他の全ての状態も毎回定義しないといけなくて、めんどくさいし間違いの元になります。

## 使ってみた感じ

### シンプルなテスト

```tsx
test('Todo一覧が表示される', () => {
  renderWithProviders(<TodoList />);

  expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
});
```

### 初期状態をカスタマイズしたテスト

```tsx
test('完了済みタスクにチェックマークが表示される', () => {
  // todosだけ指定、他はデフォルト値が使われる
  renderWithProviders(<TodoList />, {
    preloadedState: {
      todos: [{ text: 'テストタスク', completed: true }]
    }
  });

  expect(screen.getByRole('checkbox')).toBeChecked();
});
```

### 独自のストアを使いたい場合

```tsx
test('特殊なmiddlewareが必要なテスト', () => {
  // 独自のストアを作成
  const customStore = setupTestStore({
    todos: [{ text: 'カスタムタスク', completed: false }]
  });

  renderWithProviders(<TodoList />, { store: customStore });

  expect(screen.getByText('カスタムタスク')).toBeInTheDocument();
});
```

### 機能フラグのテスト

```tsx
test('新機能が有効な場合、新UIが表示される', () => {
  renderWithProviders(<TodoList />, {
    flagValueMap: {
      'new-todo-ui': true,
    }
  });

  expect(screen.getByTestId('new-todo-ui')).toBeInTheDocument();
});
```

## Storybookでも使える

```tsx
// .storybook/preview.ts
import type { Decorator } from '@storybook/react';
import { ProviderWrapper } from '../packages/react-test-provider-wrapper-example/mockProvider';

const withProviders: Decorator = (Story, context) => {
  return (
    <ProviderWrapper>
      <Story />
    </ProviderWrapper>
  );
};

export const decorators = [withProviders];
```

これで、Storybookでもテストでも同じモック環境を使えるようになりました。設定の不整合でハマることがなくなったのは地味に嬉しいです。

## ハマったところと学んだこと

### QueryClient の罠

最初、QueryClient をコンポーネント外で定義してたんですが、これだとテスト間でキャッシュが共有されて、予期しないテスト結果になることがありました。

```tsx
// ❌ これだとテスト間でキャッシュが共有される
const testQueryClient = new QueryClient({...});

export function ProviderWrapper({ children }) {
  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

```tsx
// ✅ 毎回新しいクライアントを作成する
export function ProviderWrapper({ children }) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### TypeScript の型問題

`Partial<RootState>` を `RootState` にキャストするだけだと、指定されていない部分が `undefined` になってしまって、実際のアプリケーションの動作と違ってしまいます。

そこで、デフォルトの状態とマージする仕組みを入れることで、この問題を解決しました。

### Redux Hooks の型安全性

ついでに、Redux の hooks にも型を付けておくと、テスト時も型安全になって良い感じです：

```tsx
// hooks.ts
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
```

## まとめ

ProviderWrapper を作ったことで：

- テストを書くのが楽になった
- Storybookとテストで設定を統一できた
- 部分的な状態更新でテストが書きやすくなった
- テスト間のデータ汚染を防げるようになった

もともとは「毎回同じ設定を書くのがめんどくさい」という動機でしたが、作ってみると想像以上にテスト体験が向上しました。

特に、部分的な状態更新ができるようになったのは大きくて、「このコンポーネントをテストするには状態のこの部分だけ変えればいい」というケースで、圧倒的に楽になりました。

結局のところ、公式ドキュメントに載ってることをやってるだけなんですが、実際に作ってみると色々と学びがありました。

参考にした資料：

- [Redux Toolkit - Usage with Next.js](https://redux-toolkit.js.org/usage/nextjs)
- [Testing Library - Custom Render](https://testing-library.com/docs/react-native-testing-library/setup/#custom-render)
- [React Redux - Writing Tests](https://react-redux.js.org/usage/writing-tests)

テスト環境の構築で同じような課題を抱えている方の参考になれば嬉しいです！
