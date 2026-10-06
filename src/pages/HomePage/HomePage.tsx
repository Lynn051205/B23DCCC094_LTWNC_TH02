import { useCallback, useMemo, useState } from 'react'
import { BookOpen, CheckCircle2, ListTodo, Moon, Search, Sparkles, Sun } from 'lucide-react'
import { AssignmentForm } from '../../components/AssignmentForm/AssignmentForm'
import { AssignmentList } from '../../components/AssignmentList/AssignmentList'
import { FilterTabs } from '../../components/FilterTabs/FilterTabs'
import { useAssignments } from '../../hooks/useAssignments'
import { useAppSelector } from '../../hooks/useAppSelector'
import { selectAssignments } from '../../features/assignments/assignmentSelectors'
import { calcStats } from '../../features/assignments/assignmentUtils'
import { generateAssignments } from '../../features/assignments/utils/generateAssignments'
import { useDebounce } from '../../hooks/useDebounce'
import { usePinStore } from '../../stores/usePinStore'
import { useTheme } from '../../contexts/ThemeContext'

export const HomePage = () => {
  const { assignments, filter, loading, add, replaceAll, remove, toggle, filterBy } = useAssignments()
  const source = useAppSelector(selectAssignments)
  const pinnedIds = usePinStore((state) => state.pinnedIds)
  const isPinned = usePinStore((state) => state.isPinned)
  const togglePin = usePinStore((state) => state.togglePin)
  const clearPins = usePinStore((state) => state.clearPins)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const counts = useMemo(() => calcStats(source), [source])

  const pinnedIdSet = useMemo(() => new Set(pinnedIds), [pinnedIds])
  const orderedAssignments = useMemo(() => {
    const pinned: typeof assignments = []
    const unpinned: typeof assignments = []
    for (const assignment of assignments) {
      if (pinnedIdSet.has(assignment.id)) pinned.push(assignment)
      else unpinned.push(assignment)
    }
    return [...pinned, ...unpinned]
  }, [assignments, pinnedIdSet])

  const visibleAssignments = useMemo(() => {
    const query = debouncedSearch.trim().toLocaleLowerCase('vi')
    if (!query) return orderedAssignments
    return orderedAssignments.filter((assignment) =>
      `${assignment.title} ${assignment.subject} ${assignment.dueDate}`.toLocaleLowerCase('vi').includes(query),
    )
  }, [debouncedSearch, orderedAssignments])

  const generateSamples = useCallback(() => {
    replaceAll(generateAssignments(10_000))
    clearPins()
    filterBy('ALL')
    setSearch('')
  }, [clearPins, filterBy, replaceAll])

  const deleteAssignment = useCallback((id: string) => {
    remove(id)
    if (isPinned(id)) togglePin(id)
  }, [isPinned, remove, togglePin])

  return <main className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><Sparkles size={19} /></span><span>Student <strong>Deadline</strong></span></div>
      <div className="topbar-actions">
        <div className="date-chip"><span className="status-dot" /> Học kỳ 1 · 2026</div>
        <ThemeToggle />
      </div>
    </header>
    <section className="hero">
      <div><p className="eyebrow">Your academic command center</p><h1>Giữ nhịp học tập.<br /><em>Đúng hạn hơn.</em></h1><p className="hero-copy">Một nơi gọn gàng để bạn nhìn thấy việc cần làm, ưu tiên đúng thứ và luôn đi trước deadline.</p></div>
      <div className="hero-decoration"><BookOpen size={25} /><span>Focus mode</span><strong>{counts.PENDING} việc đang chờ</strong></div>
    </section>
    <section className="stats">
      <div className="stat-card"><span className="stat-icon blue"><ListTodo size={18} /></span><div><span>Tổng bài tập</span><strong>{counts.ALL}</strong></div></div>
      <div className="stat-card"><span className="stat-icon amber"><ClockIcon /></span><div><span>Đang thực hiện</span><strong>{counts.PENDING}</strong></div></div>
      <div className="stat-card"><span className="stat-icon green"><CheckCircle2 size={18} /></span><div><span>Đã hoàn thành</span><strong>{counts.COMPLETED}</strong></div></div>
    </section>
    <AssignmentForm onSubmit={add} />
    <section className="work-section">
      <div className="section-heading"><div><p className="eyebrow">Your workload</p><h2>Danh sách bài tập</h2></div><span className="task-summary"><span>{counts.COMPLETED}</span> / {counts.ALL} hoàn thành</span></div>
      <div className="list-tools">
        <label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tìm theo tên bài tập, môn học..." aria-label="Tìm kiếm bài tập" /></label>
        <button className="button button-secondary" onClick={generateSamples}>Tạo 10.000 bài tập mẫu</button>
      </div>
      <FilterTabs active={filter} onChange={filterBy} counts={counts} />
      {loading ? <div className="loading-state"><span className="spinner" /> Đang đồng bộ bài tập...</div> : <AssignmentList assignments={visibleAssignments} onToggle={toggle} onDelete={deleteAssignment} onPin={togglePin} isPinned={isPinned} />}
    </section>
    <footer><span>STUDENT DEADLINE TRACKER</span><span>Thiết kế cho những ngày học tập có chủ đích.</span></footer>
  </main>
}

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return <button className="theme-toggle" onClick={toggleTheme} aria-label={`Chuyển sang giao diện ${theme === 'light' ? 'tối' : 'sáng'}`} title={`Giao diện ${theme === 'light' ? 'tối' : 'sáng'}`}>
    {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
    <span>{theme === 'light' ? 'Giao diện tối' : 'Giao diện sáng'}</span>
  </button>
}

const ClockIcon = () => <span className="clock-icon">◷</span>