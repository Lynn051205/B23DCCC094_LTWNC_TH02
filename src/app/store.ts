import { configureStore } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import assignmentReducer from '../features/assignments/assignmentSlice'

const logger = createLogger({
  predicate: (_state, action) =>
    ['assignments/addAssignment', 'assignments/deleteAssignment', 'assignments/toggleComplete'].includes(action.type),
  stateTransformer: (state: RootState) => ({
    assignmentCount: state.assignments.assignments.length,
    filter: state.assignments.filter,
    loading: state.assignments.loading,
    error: state.assignments.error,
  }),
})

export const store = configureStore({
  reducer: { assignments: assignmentReducer },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware()
    return import.meta.env.DEV ? middleware.concat(logger) : middleware
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch