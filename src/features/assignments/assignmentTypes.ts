export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export type FilterStatus = 'ALL' | 'PENDING' | 'COMPLETED' | 'OVERDUE'

export interface Assignment {
  id: string
  subject: string
  title: string
  dueDate: string
  priority: Priority
  completed: boolean
}

export interface ApiResponse<T> {
  data: T
  success: boolean
}

export type AssignmentInput = Omit<Assignment, 'id' | 'completed'>
export type AssignmentPatch = Partial<Pick<Assignment, 'title' | 'subject' | 'dueDate' | 'priority'>>
export type AssignmentStatus = 'completed' | 'pending' | 'overdue'

export interface AssignmentState {
  assignments: Assignment[]
  loading: boolean
  error: string | null
  filter: FilterStatus
}