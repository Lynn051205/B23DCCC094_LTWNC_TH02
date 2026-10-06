import { memo, useCallback, useMemo } from 'react'
import { ClipboardList } from 'lucide-react'
import { List, type RowComponentProps } from 'react-window'
import type { Assignment } from '../../features/assignments/assignmentTypes'
import { AssignmentCard } from '../AssignmentItem/AssignmentItem'

const ROW_HEIGHT = 110
const MAX_VIEWPORT_HEIGHT = 660

interface AssignmentListProps {
  assignments: Assignment[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onPin: (id: string) => void
  isPinned: (id: string) => boolean
}

interface AssignmentRowData {
  assignments: Assignment[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onPin: (id: string) => void
  isPinned: (id: string) => boolean
}

const AssignmentRow = ({
  index,
  style,
  assignments,
  onToggle,
  onDelete,
  onPin,
  isPinned,
}: RowComponentProps<AssignmentRowData>) => {
  const assignment = assignments[index]
  if (!assignment) return null

  return <div className="assignment-row" style={style}>
    <AssignmentCard
      assignment={assignment}
      pinned={isPinned(assignment.id)}
      onToggle={onToggle}
      onDelete={onDelete}
      onPin={onPin}
    />
  </div>
}

export const AssignmentList = memo(({ assignments, onToggle, onDelete, onPin, isPinned }: AssignmentListProps) => {
  const rowProps = useMemo<AssignmentRowData>(
    () => ({ assignments, onToggle, onDelete, onPin, isPinned }),
    [assignments, onToggle, onDelete, onPin, isPinned],
  )
  const getRowKey = useCallback((index: number, data: AssignmentRowData) => data.assignments[index]?.id ?? index, [])

  if (!assignments.length) {
    return <div className="empty-state"><ClipboardList size={32} /><h3>Không có bài tập ở đây</h3><p>Thử chọn bộ lọc khác hoặc thêm một bài tập mới.</p></div>
  }

  return <List
    className="assignment-viewport"
    defaultHeight={Math.min(assignments.length * ROW_HEIGHT, MAX_VIEWPORT_HEIGHT)}
    rowComponent={AssignmentRow}
    rowCount={assignments.length}
    rowHeight={ROW_HEIGHT}
    rowProps={rowProps}
    rowKey={getRowKey}
    overscanCount={3}
    style={{ height: Math.min(assignments.length * ROW_HEIGHT, MAX_VIEWPORT_HEIGHT), width: '100%' }}
  />
})