import type { Assignment, AssignmentStatus, FilterStatus } from './assignmentTypes'

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

export type AssignmentStats = Record<FilterStatus, number>

export const isOverdue = (assignment: Assignment): boolean =>
  !assignment.completed && startOfDay(new Date(assignment.dueDate)) < startOfDay(new Date())

export const calcStats = (assignments: Assignment[]): AssignmentStats => ({
  ALL: assignments.length,
  PENDING: assignments.filter((item) => !item.completed && !isOverdue(item)).length,
  COMPLETED: assignments.filter((item) => item.completed).length,
  OVERDUE: assignments.filter(isOverdue).length,
})

export const calcDaysLeft = (dueDate: string): number =>
  Math.ceil((startOfDay(new Date(dueDate)) - startOfDay(new Date())) / 86400000)

export const getRemainingDays = calcDaysLeft

export const getAssignmentStatus = (assignment: Assignment): AssignmentStatus => {
  if (assignment.completed) return 'completed'
  return isOverdue(assignment) ? 'overdue' : 'pending'
}

export const getRemainingLabel = (assignment: Assignment): string => {
  if (assignment.completed) return 'Đã hoàn thành'
  const days = calcDaysLeft(assignment.dueDate)
  if (days === 0) return 'Hết hạn hôm nay'
  if (days < 0) return `Quá hạn ${Math.abs(days)} ngày`
  return `Còn ${days} ngày`
}

export const formatDueDate = (dueDate: string) =>
  new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dueDate))

export const isAssignment = (value: unknown): value is Assignment => {
  if (!value || typeof value !== 'object') return false
  const item = value as Record<string, unknown>
  return typeof item.id === 'string' && typeof item.subject === 'string' && typeof item.title === 'string' && typeof item.dueDate === 'string'
}