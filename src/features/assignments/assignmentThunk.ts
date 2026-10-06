import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ApiResponse, Assignment } from './assignmentTypes'
import { isAssignment } from './assignmentUtils'

const seedAssignments: Assignment[] = [
  { id: '1', subject: 'Lập trình Web', title: 'Xây dựng Student Dashboard', dueDate: '2026-09-19', priority: 'HIGH' as Assignment['priority'], completed: false },
  { id: '2', subject: 'Cơ sở dữ liệu', title: 'Thiết kế ERD hệ thống thư viện', dueDate: '2026-09-23', priority: 'MEDIUM' as Assignment['priority'], completed: false },
  { id: '3', subject: 'Tiếng Anh chuyên ngành', title: 'Presentation: Future of AI', dueDate: '2026-09-15', priority: 'LOW' as Assignment['priority'], completed: true },
  { id: '4', subject: 'Lập trình Web', title: 'Ôn tập React Hooks', dueDate: '2026-09-11', priority: 'HIGH' as Assignment['priority'], completed: false },
]

export const fetchAssignments = createAsyncThunk<Assignment[]>('assignments/fetchAssignments', async () => {
  try {
    const response = await fetch('/assignments.json')
    if (!response.ok) throw new Error('API unavailable')
    const payload = (await response.json()) as ApiResponse<unknown> | unknown
    const data = Array.isArray(payload) ? payload : (payload as ApiResponse<unknown>).data
    if (Array.isArray(data) && data.every(isAssignment)) return data as Assignment[]
    throw new Error('Invalid API response')
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 450))
    return seedAssignments
  }
})