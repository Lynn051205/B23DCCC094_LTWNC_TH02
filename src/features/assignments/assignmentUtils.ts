import type { Assignment, AssignmentStatus } from './assignmentTypes'

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()

export const isOverdue = (assignment: Assignment): boolean =>
  !assignment.completed && startOfDay(new Date(assignment.dueDate)) < startOfDay(new Date())

export const getRemainingDays = (dueDate: string): number =>
  Math.ceil((startOfDay(new Date(dueDate)) - startOfDay(new Date())) / 86400000)

export const getAssignmentStatus = (assignment: Assignment): AssignmentStatus => {
  if (assignment.completed) return 'completed'
  return isOverdue(assignment) ? 'overdue' : 'pending'
}

export const getRemainingLabel = (assignment: Assignment): string => {
  if (assignment.completed) return 'Đã hoàn thành'
  const days = getRemainingDays(assignment.dueDate)
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