import { BookOpen, CheckCircle2, ListTodo, Sparkles } from 'lucide-react'
import { AssignmentForm } from '../../components/AssignmentForm/AssignmentForm'
import { AssignmentList } from '../../components/AssignmentList/AssignmentList'
import { FilterTabs } from '../../components/FilterTabs/FilterTabs'
import { useAssignments } from '../../hooks/useAssignments'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAssignments } from '../../features/assignments/assignmentSelectors'
import { isOverdue } from '../../features/assignments/assignmentUtils'
import type { FilterStatus } from '../../features/assignments/assignmentTypes'

export const HomePage = () => {
  const { assignments, filter, loading, add, remove, toggle, filterBy } = useAssignments()
  const source = useAppSelector(selectAssignments)
  const counts: Record<FilterStatus, number> = { ALL: source.length, PENDING: source.filter((item) => !item.completed && !isOverdue(item)).length, COMPLETED: source.filter((item) => item.completed).length, OVERDUE: source.filter(isOverdue).length }
  return <main className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark"><Sparkles size={19} /></span><span>Student <strong>Deadline</strong></span></div><div className="date-chip"><span className="status-dot" /> Học kỳ 1 · 2026</div></header><section className="hero"><div><p className="eyebrow">Your academic command center</p><h1>Giữ nhịp học tập.<br /><em>Đúng hạn hơn.</em></h1><p className="hero-copy">Một nơi gọn gàng để bạn nhìn thấy việc cần làm, ưu tiên đúng thứ và luôn đi trước deadline.</p></div><div className="hero-decoration"><BookOpen size={25} /><span>Focus mode</span><strong>{counts.PENDING} việc đang chờ</strong></div></section><section className="stats"><div className="stat-card"><span className="stat-icon blue"><ListTodo size={18} /></span><div><span>Tổng bài tập</span><strong>{counts.ALL}</strong></div></div><div className="stat-card"><span className="stat-icon amber"><ClockIcon /></span><div><span>Đang thực hiện</span><strong>{counts.PENDING}</strong></div></div><div className="stat-card"><span className="stat-icon green"><CheckCircle2 size={18} /></span><div><span>Đã hoàn thành</span><strong>{counts.COMPLETED}</strong></div></div></section><AssignmentForm onSubmit={add} /><section className="work-section"><div className="section-heading"><div><p className="eyebrow">Your workload</p><h2>Danh sách bài tập</h2></div><span className="task-summary"><span>{counts.COMPLETED}</span> / {counts.ALL} hoàn thành</span></div><FilterTabs active={filter} onChange={filterBy} counts={counts} />{loading ? <div className="loading-state"><span className="spinner" /> Đang đồng bộ bài tập...</div> : <AssignmentList assignments={assignments} onToggle={toggle} onDelete={remove} />}</section><footer><span>STUDENT DEADLINE TRACKER</span><span>Thiết kế cho những ngày học tập có chủ đích.</span></footer></main>
}
const ClockIcon = () => <span className="clock-icon">◷</span>