import { useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { addAssignment, deleteAssignment, setFilter, toggleComplete } from '../features/assignments/assignmentSlice'
import { fetchAssignments } from '../features/assignments/assignmentThunk'
import { selectAssignmentState, selectFilteredAssignments } from '../features/assignments/assignmentSelectors'
import { getRemainingDays } from '../features/assignments/assignmentUtils'
import type { AssignmentInput, FilterStatus } from '../features/assignments/assignmentTypes'

export const useAssignments = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectAssignmentState)
  const assignments = useAppSelector(selectFilteredAssignments)
  useEffect(() => { if (!state.assignments.length) void dispatch(fetchAssignments()) }, [dispatch, state.assignments.length])
  return {
    ...state,
    assignments,
    add: (assignment: AssignmentInput) => dispatch(addAssignment(assignment)),
    remove: (id: string) => dispatch(deleteAssignment(id)),
    toggle: (id: string) => dispatch(toggleComplete(id)),
    filterBy: (filter: FilterStatus) => dispatch(setFilter(filter)),
    remainingDays: getRemainingDays,
  }
}