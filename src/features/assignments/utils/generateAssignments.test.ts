import { generateAssignments } from './generateAssignments'
import { Priority } from '../assignmentTypes'

describe('generateAssignments', () => {
  it('generates the requested number of valid assignments', () => {
    const assignments = generateAssignments(10_000)

    expect(assignments).toHaveLength(10_000)
    expect(assignments[0]).toMatchObject({
      id: 'stress-1',
      title: 'Bài tập mẫu 1',
      completed: true,
      priority: Priority.HIGH,
    })
    expect(new Set(assignments.map((assignment) => assignment.id)).size).toBe(10_000)
  })

  it('returns an empty list for a zero count', () => {
    expect(generateAssignments(0)).toEqual([])
  })

  it('rejects negative and fractional counts', () => {
    expect(() => generateAssignments(-1)).toThrow(RangeError)
    expect(() => generateAssignments(1.5)).toThrow(RangeError)
  })
})
