import type { RootState } from '../../app/store'
import { isOverdue } from './assignmentUtils'
import type { FilterStatus } from './assignmentTypes'

export const selectAssignments = (state: RootState) => state.assignments.assignments
export const selectAssignmentState = (state: RootState) => state.assignments
export const selectFilteredAssignments = (state: RootState) => {
  const { assignments, filter } = state.assignments
  const filters: Record<FilterStatus, typeof assignments> = {
    ALL: assignments,
    PENDING: assignments.filter((item) => !item.completed && !isOverdue(item)),
    COMPLETED: assignments.filter((item) => item.completed),
    OVERDUE: assignments.filter(isOverdue),
  }
  return filters[filter]
}