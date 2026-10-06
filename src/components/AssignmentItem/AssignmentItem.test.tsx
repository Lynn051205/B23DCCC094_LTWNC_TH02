import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssignmentCard } from './AssignmentItem'
import { Priority, type Assignment } from '../../features/assignments/assignmentTypes'

const assignment: Assignment = {
  id: 'a-1',
  subject: 'Lập trình Web',
  title: 'Hoàn thiện giao diện',
  dueDate: '2099-12-31',
  priority: Priority.HIGH,
  completed: false,
}

describe('AssignmentCard', () => {
  it('renders assignment details', () => {
    render(<AssignmentCard assignment={assignment} pinned={false} onToggle={jest.fn()} onDelete={jest.fn()} onPin={jest.fn()} />)

    expect(screen.getByText('Lập trình Web')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Hoàn thiện giao diện' })).toBeInTheDocument()
    expect(screen.getByText('HIGH')).toBeInTheDocument()
  })

  it('calls the completion handler with the assignment ID', async () => {
    const user = userEvent.setup()
    const onToggle = jest.fn()
    render(<AssignmentCard assignment={assignment} pinned={false} onToggle={onToggle} onDelete={jest.fn()} onPin={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Đánh dấu hoàn thành' }))
    expect(onToggle).toHaveBeenCalledWith('a-1')
  })

  it('calls the pin handler and exposes the pinned state', async () => {
    const user = userEvent.setup()
    const onPin = jest.fn()
    const { rerender } = render(<AssignmentCard assignment={assignment} pinned={false} onToggle={jest.fn()} onDelete={jest.fn()} onPin={onPin} />)

    await user.click(screen.getByRole('button', { name: 'Ghim bài tập' }))
    expect(onPin).toHaveBeenCalledWith('a-1')

    rerender(<AssignmentCard assignment={assignment} pinned onToggle={jest.fn()} onDelete={jest.fn()} onPin={onPin} />)
    expect(screen.getByRole('button', { name: 'Bỏ ghim bài tập' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls the delete handler with the assignment ID', async () => {
    const user = userEvent.setup()
    const onDelete = jest.fn()
    render(<AssignmentCard assignment={assignment} pinned={false} onToggle={jest.fn()} onDelete={onDelete} onPin={jest.fn()} />)

    await user.click(screen.getByRole('button', { name: 'Xóa bài tập' }))
    expect(onDelete).toHaveBeenCalledWith('a-1')
  })
})
