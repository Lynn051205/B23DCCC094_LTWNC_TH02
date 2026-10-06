import { Priority, type Assignment } from '../assignmentTypes'

const subjects = ['Lập trình Web', 'Cơ sở dữ liệu', 'Cấu trúc dữ liệu', 'Tiếng Anh chuyên ngành', 'Phát triển ứng dụng']
const priorities = [Priority.HIGH, Priority.MEDIUM, Priority.LOW]

export const generateAssignments = (count: number): Assignment[] => {
  if (!Number.isInteger(count) || count < 0) {
    throw new RangeError('Số lượng bài tập phải là số nguyên không âm.')
  }

  const today = new Date()
  return Array.from({ length: count }, (_, index) => {
    const dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (index % 60))
    return {
      id: `stress-${index + 1}`,
      subject: subjects[index % subjects.length],
      title: `Bài tập mẫu ${index + 1}`,
      dueDate: `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(dueDate.getDate()).padStart(2, '0')}`,
      priority: priorities[index % priorities.length],
      completed: index % 5 === 0,
    }
  })
}
