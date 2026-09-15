import { useState, type FormEvent, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { Priority, type AssignmentInput } from '../../features/assignments/assignmentTypes'

interface FieldProps { label: string; children: ReactNode; className?: string }
const Field = ({ label, children, className = '' }: FieldProps) => <label className={`form-field ${className}`}><span>{label}</span>{children}</label>

interface AssignmentFormProps { onSubmit: (assignment: AssignmentInput) => void }
const AssignmentFormBase = ({ onSubmit }: AssignmentFormProps) => {
  const [form, setForm] = useState<AssignmentInput>({ subject: '', title: '', dueDate: '', priority: Priority.MEDIUM })
  const [error, setError] = useState('')
  const update = <K extends keyof AssignmentInput>(key: K, value: AssignmentInput[K]) => setForm((current) => ({ ...current, [key]: value }))

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!form.subject.trim() || !form.title.trim() || !form.dueDate) return setError('Vui lòng điền đầy đủ thông tin.')
    if (new Date(form.dueDate).getTime() < new Date(new Date().toDateString()).getTime()) return setError('Hạn nộp phải là hôm nay hoặc một ngày trong tương lai.')
    onSubmit(form)
    setForm({ subject: '', title: '', dueDate: '', priority: Priority.MEDIUM })
    setError('')
  }

  return <form className="assignment-form" onSubmit={submit}>
    <div className="form-heading"><div><p className="eyebrow">New assignment</p><h2>Thêm bài tập mới</h2></div><span className="form-hint">Các trường bắt buộc *</span></div>
    <div className="form-grid">
      <AssignmentFormBase.Field label="Môn học *"><input value={form.subject} onChange={(event) => update('subject', event.target.value)} placeholder="Ví dụ: Lập trình Web" /></AssignmentFormBase.Field>
      <AssignmentFormBase.Field label="Tên bài tập *"><input value={form.title} onChange={(event) => update('title', event.target.value)} placeholder="Bạn cần hoàn thành gì?" /></AssignmentFormBase.Field>
      <AssignmentFormBase.Field label="Hạn nộp *"><input type="date" value={form.dueDate} onChange={(event) => update('dueDate', event.target.value)} /></AssignmentFormBase.Field>
      <AssignmentFormBase.Field label="Độ ưu tiên"><select value={form.priority} onChange={(event) => update('priority', event.target.value as Priority)}><option value={Priority.HIGH}>Cao</option><option value={Priority.MEDIUM}>Trung bình</option><option value={Priority.LOW}>Thấp</option></select></AssignmentFormBase.Field>
    </div>
    {error && <p className="form-error">{error}</p>}
    <button className="button button-primary" type="submit"><Plus size={17} /> Thêm bài tập</button>
  </form>
}

AssignmentFormBase.Field = Field
export const AssignmentForm = AssignmentFormBase