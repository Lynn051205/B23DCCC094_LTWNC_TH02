import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchAssignments } from './assignmentThunk'
import type { AssignmentInput, AssignmentState, FilterStatus } from './assignmentTypes'

const initialState: AssignmentState = { assignments: [], loading: false, error: null, filter: 'ALL' }

const assignmentSlice = createSlice({
  name: 'assignments',
  initialState,
  reducers: {
    addAssignment: (state, action: PayloadAction<AssignmentInput>) => {
      state.assignments.unshift({ ...action.payload, id: crypto.randomUUID(), completed: false })
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((assignment) => assignment.id !== action.payload)
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const assignment = state.assignments.find((item) => item.id === action.payload)
      if (assignment) assignment.completed = !assignment.completed
    },
    setFilter: (state, action: PayloadAction<FilterStatus>) => { state.filter = action.payload },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssignments.pending, (state) => { state.loading = true; state.error = null })
    builder.addCase(fetchAssignments.fulfilled, (state, action) => { state.loading = false; state.assignments = action.payload })
    builder.addCase(fetchAssignments.rejected, (state) => { state.loading = false; state.error = 'Không thể tải danh sách bài tập.' })
  },
})

export const { addAssignment, deleteAssignment, toggleComplete, setFilter } = assignmentSlice.actions
export default assignmentSlice.reducer