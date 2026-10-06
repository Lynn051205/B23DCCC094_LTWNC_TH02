import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { isOverdue } from './assignmentUtils'
import type { FilterStatus } from './assignmentTypes'

export const selectAssignments = (state: RootState) => state.assignments.assignments
export const selectAssignmentState = (state: RootState) => state.assignments
const selectFilter = (state: RootState): FilterStatus => state.assignments.filter

export const selectFilteredAssignments = createSelector(
  [selectAssignments, selectFilter],
  (assignments, filter) => {
    switch (filter) {
      case 'ALL':
        return assignments
      case 'PENDING':
        return assignments.filter((item) => !item.completed && !isOverdue(item))
      case 'COMPLETED':
        return assignments.filter((item) => item.completed)
      case 'OVERDUE':
        return assignments.filter(isOverdue)
    }
  },
)