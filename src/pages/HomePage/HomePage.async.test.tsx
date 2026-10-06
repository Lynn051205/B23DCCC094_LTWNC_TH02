import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { assignmentReducer } from '../../features/assignments/assignmentSlice'
import { HomePage } from './HomePage'

const successfulAssignments = [{
  id: 'api-1',
  subject: 'Lập trình Web',
  title: 'Tải từ API',
  dueDate: '2099-12-31',
  priority: 'HIGH',
  completed: false,
}]

const renderHomePage = () => {
  const store = configureStore({ reducer: { assignments: assignmentReducer } })
  return render(<Provider store={store}><ThemeProvider><HomePage /></ThemeProvider></Provider>)
}

const jsonResponse = (payload: unknown): Response => ({
  ok: true,
  json: async () => payload,
} as Response)

describe('HomePage asynchronous assignment loading', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows the loading state while the API request is pending', async () => {
    let resolveRequest: ((response: Response) => void) | undefined
    jest.spyOn(globalThis, 'fetch').mockImplementation(() => new Promise((resolve) => {
      resolveRequest = resolve
    }))

    renderHomePage()
    expect(await screen.findByText('Đang đồng bộ bài tập...')).toBeInTheDocument()

    resolveRequest?.(jsonResponse(successfulAssignments))
    expect(await screen.findByRole('heading', { name: 'Tải từ API' })).toBeInTheDocument()
  })

  it('renders assignments returned by a successful API response', async () => {
    jest.spyOn(globalThis, 'fetch').mockResolvedValue(jsonResponse({ data: successfulAssignments, success: true }))

    renderHomePage()

    expect(await screen.findByRole('heading', { name: 'Tải từ API' })).toBeInTheDocument()
    expect(screen.getByText('Lập trình Web')).toBeInTheDocument()
    expect(globalThis.fetch).toHaveBeenCalledWith('/assignments.json')
  })

  it('loads seed assignments after an API failure without making a real request', async () => {
    jest.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('network unavailable'))

    renderHomePage()

    expect(await screen.findByRole('heading', { name: 'Xây dựng Student Dashboard' })).toBeInTheDocument()
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
    expect(screen.queryByText('Đang đồng bộ bài tập...')).not.toBeInTheDocument()
  })
})
