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

// This type interface extends the default options for render from testing-library/react
export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState> | undefined
  store?: TestStore
  // Add other options here
  flagValueMap?: Record<string, boolean | string | number>
}

export function ProviderWrapper({
  children,
  // Automatically create a store instance if no store was passed in
  preloadedState = mockPreloadedState,
  store = setupTestStore(preloadedState),
  flagValueMap = {},
}: PropsWithChildren<ExtendedRenderOptions>): JSX.Element {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
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
