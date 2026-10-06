import {
  calcStats,
  calcDaysLeft,
  formatDueDate,
  getAssignmentStatus,
  getRemainingLabel,
  isAssignment,
  isOverdue,
} from './assignmentUtils'
import { Priority, type Assignment } from './assignmentTypes'

const makeAssignment = (overrides: Partial<Assignment> = {}): Assignment => ({
  id: 'assignment-1',
  subject: 'Lập trình Web',
  title: 'Bài tập React',
  dueDate: '2026-10-05',
  priority: Priority.MEDIUM,
  completed: false,
  ...overrides,
})

describe('assignment utilities', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date(2026, 9, 6, 12))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('marks an incomplete assignment due before today as overdue', () => {
    expect(isOverdue(makeAssignment())).toBe(true)
  })

  it('does not mark an assignment due today or completed as overdue', () => {
    expect(isOverdue(makeAssignment({ dueDate: '2026-10-06' }))).toBe(false)
    expect(isOverdue(makeAssignment({ completed: true }))).toBe(false)
  })

  it('calculates days left including the zero-day boundary', () => {
    expect(calcDaysLeft('2026-10-06')).toBe(0)
    expect(calcDaysLeft('2026-10-08')).toBe(2)
    expect(calcDaysLeft('2026-10-05')).toBe(-1)
  })

  it('calculates counts for an empty assignment list', () => {
    expect(calcStats([])).toEqual({ ALL: 0, PENDING: 0, COMPLETED: 0, OVERDUE: 0 })
  })

  it('calculates total, pending, completed, and overdue assignment counts', () => {
    const assignments = [
      makeAssignment({ id: 'pending', dueDate: '2026-10-07' }),
      makeAssignment({ id: 'completed', completed: true }),
      makeAssignment({ id: 'overdue', dueDate: '2026-10-05' }),
    ]

    expect(calcStats(assignments)).toEqual({ ALL: 3, PENDING: 1, COMPLETED: 1, OVERDUE: 1 })
  })

  it('returns the expected status and remaining label at date boundaries', () => {
    expect(getAssignmentStatus(makeAssignment({ dueDate: '2026-10-06' }))).toBe('pending')
    expect(getRemainingLabel(makeAssignment({ dueDate: '2026-10-06' }))).toBe('Hết hạn hôm nay')
    expect(getRemainingLabel(makeAssignment({ completed: true }))).toBe('Đã hoàn thành')
  })

  it('formats a due date using the Vietnamese locale', () => {
    expect(formatDueDate('2026-10-06')).toContain('2026')
  })

  it('validates assignment-like values without accepting incomplete objects', () => {
    expect(isAssignment(makeAssignment())).toBe(true)
    expect(isAssignment(null)).toBe(false)
    expect(isAssignment({ id: 'only-id' })).toBe(false)
  })
})
