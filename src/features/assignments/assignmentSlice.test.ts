import {
  assignmentReducer,
  addAssignment,
  deleteAssignment,
  setFilter,
  toggleComplete,
} from './assignmentSlice'
import { fetchAssignments } from './assignmentThunk'
import type { AssignmentState } from './assignmentTypes'
import { Priority } from './assignmentTypes'

const initialState: AssignmentState = {
  assignments: [{
    id: 'existing',
    subject: 'Lập trình Web',
    title: 'Bài tập',
    dueDate: '2026-12-31',
    priority: Priority.MEDIUM,
    completed: false,
  }],
  loading: false,
  error: null,
  filter: 'ALL',
}

describe('assignment reducer', () => {
  it('adds a new incomplete assignment with a generated ID', () => {
    const result = assignmentReducer(initialState, addAssignment({
      subject: 'Cơ sở dữ liệu',
      title: 'Thiết kế ERD',
      dueDate: '2026-12-31',
      priority: Priority.HIGH,
    }))

    expect(result.assignments).toHaveLength(2)
    expect(result.assignments[0]).toMatchObject({
      subject: 'Cơ sở dữ liệu',
      title: 'Thiết kế ERD',
      completed: false,
    })
    expect(result.assignments[0]?.id).toEqual(expect.any(String))
  })

  it('removes an assignment when its ID exists', () => {
    expect(assignmentReducer(initialState, deleteAssignment('existing')).assignments).toHaveLength(0)
  })

  it('keeps the list unchanged when deleting an unknown ID', () => {
    expect(assignmentReducer(initialState, deleteAssignment('missing')).assignments).toEqual(initialState.assignments)
  })

  it('toggles completion for a matching assignment', () => {
    const result = assignmentReducer(initialState, toggleComplete('existing'))
    expect(result.assignments[0]?.completed).toBe(true)
  })

  it('keeps assignments unchanged when toggling an unknown ID', () => {
    expect(assignmentReducer(initialState, toggleComplete('missing')).assignments).toEqual(initialState.assignments)
  })

  it('updates the selected filter', () => {
    expect(assignmentReducer(initialState, setFilter('COMPLETED')).filter).toBe('COMPLETED')
  })

  it('sets loading and clears a previous error when an API request starts', () => {
    const stateWithError = { ...initialState, error: 'Previous error' }
    const result = assignmentReducer(stateWithError, fetchAssignments.pending('request-1', undefined))

    expect(result.loading).toBe(true)
    expect(result.error).toBeNull()
  })

  it('stores loaded assignments when an API request succeeds', () => {
    const result = assignmentReducer(initialState, fetchAssignments.fulfilled(initialState.assignments, 'request-1', undefined))

    expect(result.loading).toBe(false)
    expect(result.assignments).toEqual(initialState.assignments)
  })

  it('sets an error when an async assignment request is rejected', () => {
    const result = assignmentReducer(initialState, fetchAssignments.rejected(new Error('request failed'), 'request-1', undefined))

    expect(result.loading).toBe(false)
    expect(result.error).toBe('Không thể tải danh sách bài tập.')
  })
})
