import { memo } from 'react'
import { CalendarDays, Check, Clock3, Pin, Trash2 } from 'lucide-react'
import type { Assignment } from '../../features/assignments/assignmentTypes'
import { formatDueDate, getAssignmentStatus, getRemainingLabel } from '../../features/assignments/assignmentUtils'

interface AssignmentCardProps {
  assignment: Assignment
  pinned: boolean
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onPin: (id: string) => void
}

export const AssignmentCard = memo(({ assignment, pinned, onToggle, onDelete, onPin }: AssignmentCardProps) => {
  const status = getAssignmentStatus(assignment)
  return <article className={`assignment-item ${status} priority-${assignment.priority.toLowerCase()}`}>
    <button className={`check-button ${assignment.completed ? 'checked' : ''}`} onClick={() => onToggle(assignment.id)} aria-label={assignment.completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu hoàn thành'}>{assignment.completed && <Check size={15} strokeWidth={3} />}</button>
    <div className="assignment-main"><div className="assignment-topline"><span className="subject-label">{assignment.subject}</span><span className={`priority priority-${assignment.priority.toLowerCase()}`}>{assignment.priority}</span></div><h3 className={assignment.completed ? 'completed-title' : ''}>{assignment.title}</h3><div className="assignment-meta"><span><CalendarDays size={14} />{formatDueDate(assignment.dueDate)}</span><span className={`remaining ${status}`}><Clock3 size={14} />{getRemainingLabel(assignment)}</span></div></div>
    <button className={`icon-button pin-button ${pinned ? 'pinned' : ''}`} onClick={() => onPin(assignment.id)} aria-label={pinned ? 'Bỏ ghim bài tập' : 'Ghim bài tập'} aria-pressed={pinned} title={pinned ? 'Bỏ ghim bài tập' : 'Ghim bài tập'}><Pin size={16} /></button>
    <button className="icon-button delete-button" onClick={() => onDelete(assignment.id)} aria-label="Xóa bài tập" title="Xóa bài tập"><Trash2 size={17} /></button>
  </article>
})