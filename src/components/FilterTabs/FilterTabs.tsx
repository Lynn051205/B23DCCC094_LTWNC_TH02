import { CheckCircle2, Circle, LayoutList, TriangleAlert } from 'lucide-react'
import type { FilterStatus } from '../../features/assignments/assignmentTypes'

const tabs: { id: FilterStatus; label: string; icon: typeof LayoutList }[] = [
  { id: 'ALL', label: 'Tất cả', icon: LayoutList }, { id: 'PENDING', label: 'Đang làm', icon: Circle }, { id: 'COMPLETED', label: 'Hoàn thành', icon: CheckCircle2 }, { id: 'OVERDUE', label: 'Quá hạn', icon: TriangleAlert },
]
export const FilterTabs = ({ active, onChange, counts }: { active: FilterStatus; onChange: (value: FilterStatus) => void; counts: Record<FilterStatus, number> }) => <div className="filter-tabs" role="tablist">{tabs.map(({ id, label, icon: Icon }) => <button className={active === id ? 'filter-tab active' : 'filter-tab'} key={id} onClick={() => onChange(id)} role="tab" aria-selected={active === id}><Icon size={16} /><span>{label}</span><b>{counts[id]}</b></button>)}</div>