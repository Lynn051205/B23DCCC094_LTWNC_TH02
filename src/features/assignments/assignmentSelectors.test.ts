import { selectFilteredAssignments } from './assignmentSelectors'
import type { RootState } from '../../app/store'
import { Priority } from './assignmentTypes'

const assignments: RootState['assignments']['assignments'] = [
  { id: 'pending', subject: 'Web', title: 'Pending', dueDate: '2026-10-07', priority: Priority.LOW, completed: false },
  { id: 'completed', subject: 'Web', title: 'Completed', dueDate: '2026-10-05', priority: Priority.HIGH, completed: true },
  { id: 'overdue', subject: 'DB', title: 'Overdue', dueDate: '2026-10-05', priority: Priority.MEDIUM, completed: false },
]

const stateFor = (filter: RootState['assignments']['filter']): RootState => ({
  assignments: { assignments, filter, loading: false, error: null },
})

describe('selectFilteredAssignments', () => {
  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2026, 9, 6, 12))
  })

  afterAll(() => jest.useRealTimers())

  it('returns all assignments for ALL', () => {
    expect(selectFilteredAssignments(stateFor('ALL'))).toHaveLength(3)
  })

  it('filters completed and overdue assignments', () => {
    expect(selectFilteredAssignments(stateFor('PENDING')).map((item) => item.id)).toEqual(['pending'])
    expect(selectFilteredAssignments(stateFor('COMPLETED')).map((item) => item.id)).toEqual(['completed'])
    expect(selectFilteredAssignments(stateFor('OVERDUE')).map((item) => item.id)).toEqual(['overdue'])
  })
})
