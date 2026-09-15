import { CalendarDays, Check, Clock3, Trash2 } from 'lucide-react'
import type { Assignment } from '../../features/assignments/assignmentTypes'
import { formatDueDate, getAssignmentStatus, getRemainingLabel } from '../../features/assignments/assignmentUtils'

export const AssignmentItem = ({ assignment, onToggle, onDelete }: { assignment: Assignment; onToggle: () => void; onDelete: () => void }) => {
  const status = getAssignmentStatus(assignment)
  return <article className={`assignment-item ${status} priority-${assignment.priority.toLowerCase()}`}>
    <button className={`check-button ${assignment.completed ? 'checked' : ''}`} onClick={onToggle} aria-label={assignment.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}>{assignment.completed && <Check size={15} strokeWidth={3} />}</button>
    <div className="assignment-main"><div className="assignment-topline"><span className="subject-label">{assignment.subject}</span><span className={`priority priority-${assignment.priority.toLowerCase()}`}>{assignment.priority}</span></div><h3 className={assignment.completed ? 'completed-title' : ''}>{assignment.title}</h3><div className="assignment-meta"><span><CalendarDays size={14} />{formatDueDate(assignment.dueDate)}</span><span className={`remaining ${status}`}><Clock3 size={14} />{getRemainingLabel(assignment)}</span></div></div>
    <button className="icon-button delete-button" onClick={onDelete} aria-label="Xóa bài tập" title="Xóa bài tập"><Trash2 size={17} /></button>
  </article>
}