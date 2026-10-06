import { useCallback, useEffect } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { useAppSelector } from './useAppSelector'
import { addAssignment, deleteAssignment, replaceAssignments, setFilter, toggleComplete } from '../features/assignments/assignmentSlice'
import { fetchAssignments } from '../features/assignments/assignmentThunk'
import { selectAssignmentState, selectAssignments, selectFilteredAssignments } from '../features/assignments/assignmentSelectors'
import { getRemainingDays } from '../features/assignments/assignmentUtils'
import type { AssignmentInput, FilterStatus } from '../features/assignments/assignmentTypes'

export const useAssignments = () => {
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectAssignmentState)
  const assignments = useAppSelector(selectFilteredAssignments)
  useEffect(() => { if (!state.assignments.length) void dispatch(fetchAssignments()) }, [dispatch, state.assignments.length])
  const add = useCallback((assignment: AssignmentInput) => dispatch(addAssignment(assignment)), [dispatch])
  const replaceAll = useCallback((items: ReturnType<typeof selectAssignments>) => dispatch(replaceAssignments(items)), [dispatch])
  const remove = useCallback((id: string) => dispatch(deleteAssignment(id)), [dispatch])
  const toggle = useCallback((id: string) => dispatch(toggleComplete(id)), [dispatch])
  const filterBy = useCallback((filter: FilterStatus) => dispatch(setFilter(filter)), [dispatch])
  return {
    ...state,
    assignments,
    add,
    replaceAll,
    remove,
    toggle,
    filterBy,
    remainingDays: getRemainingDays,
  }
}