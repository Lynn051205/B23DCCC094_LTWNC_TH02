import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  it('updates the debounced value only after 300 milliseconds', () => {
    const { result, rerender } = renderHook(({ value }: { value: string }) => useDebounce(value, 300), {
      initialProps: { value: '' },
    })

    rerender({ value: 'search' })
    expect(result.current).toBe('')

    act(() => jest.advanceTimersByTime(299))
    expect(result.current).toBe('')

    act(() => jest.advanceTimersByTime(1))
    expect(result.current).toBe('search')
  })

  it('cancels a pending update when the input changes again', () => {
    const { result, rerender } = renderHook(({ value }: { value: string }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    })

    rerender({ value: 'second' })
    act(() => jest.advanceTimersByTime(200))
    rerender({ value: 'final' })
    act(() => jest.advanceTimersByTime(300))

    expect(result.current).toBe('final')
  })
})
