import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AssignmentForm } from './AssignmentForm'
import { Priority, type AssignmentInput } from '../../features/assignments/assignmentTypes'

describe('AssignmentForm', () => {
  it('shows a validation message when required values are missing', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    render(<AssignmentForm onSubmit={onSubmit} />)

    await user.click(screen.getByRole('button', { name: 'Thêm bài tập' }))

    expect(screen.getByText('Vui lòng điền đầy đủ thông tin.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('rejects a due date in the past', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    render(<AssignmentForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Môn học *'), 'Lập trình Web')
    await user.type(screen.getByLabelText('Tên bài tập *'), 'Bài tập')
    await user.type(screen.getByLabelText('Hạn nộp *'), '2000-01-01')
    await user.click(screen.getByRole('button', { name: 'Thêm bài tập' }))

    expect(screen.getByText('Hạn nộp phải là hôm nay hoặc một ngày trong tương lai.')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('submits valid assignment data and resets the form', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn<void, [AssignmentInput]>()
    render(<AssignmentForm onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText('Môn học *'), 'Lập trình Web')
    await user.type(screen.getByLabelText('Tên bài tập *'), 'Hoàn thiện giao diện')
    await user.type(screen.getByLabelText('Hạn nộp *'), '2099-12-31')
    await user.selectOptions(screen.getByLabelText('Độ ưu tiên'), Priority.HIGH)
    await user.click(screen.getByRole('button', { name: 'Thêm bài tập' }))

    expect(onSubmit).toHaveBeenCalledWith({
      subject: 'Lập trình Web',
      title: 'Hoàn thiện giao diện',
      dueDate: '2099-12-31',
      priority: Priority.HIGH,
    })
    expect(screen.getByLabelText('Tên bài tập *')).toHaveValue('')
  })
})
