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
