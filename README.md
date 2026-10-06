# Student Deadline Tracker

Bài thực hành React + TypeScript + Vite tiếp nối TH01. Ứng dụng quản lý bài tập theo hạn nộp, trạng thái, mức ưu tiên và bộ lọc; TH02 bổ sung ghim bài tập, giao diện sáng/tối, Redux logger, tìm kiếm có debounce và tạo dữ liệu kiểm thử hiệu năng.

## Chạy ứng dụng

```bash
npm install
npm run dev
```

Kiểm tra TypeScript và build production:

```bash
npm run build
npx tsc --noEmit
```

Chạy Jest/React Testing Library và kiểm tra coverage:

```bash
npm test
npm test -- --coverage
```

## Tính năng TH02

- Ghim bài tập bằng Zustand; bài ghim được sắp xếp ở đầu danh sách.
- Chuyển theme sáng/tối bằng ThemeContext riêng.
- Redux logger chỉ hoạt động khi chạy development và ghi action thêm, xóa, hoàn thành.
- Tìm kiếm theo tên, môn học hoặc ngày; lọc được áp dụng sau khi ngừng nhập 300 ms.
- Dữ liệu khởi tạo được tải từ `public/assignments.json` cùng origin để tránh lỗi CORS từ dịch vụ mock bên ngoài.
- Nút **Tạo 10.000 bài tập mẫu** tạo chính xác 10.000 assignment hợp lệ trong một lần dispatch.
- `AssignmentCard` được bọc bằng `React.memo`; callback của danh sách ổn định để tránh render lại card không liên quan.
- Danh sách dùng windowing: chỉ render các hàng trong viewport và một số hàng dự phòng, nhưng vẫn giữ nguyên toàn bộ dữ liệu trong Redux.
- Bộ đếm, danh sách lọc (`createSelector`), thứ tự ghim và kết quả search dùng memoization phù hợp.
- Đây là các cách tối ưu riêng biệt: `React.memo`/callback ổn định, debounce search, memoized selector, memoized dữ liệu dẫn xuất và windowing danh sách.

## Performance Before Optimization

Đo thực tế trên trang danh sách trước khi áp dụng tối ưu, với 10.000 bài tập:

| Chỉ số BEFORE | Kết quả |
|---|---:|
| Lighthouse Performance score | Chưa được cung cấp |
| First Contentful Paint (FCP) | 4.2s |
| Largest Contentful Paint (LCP) | 7.9s |
| Total Blocking Time (TBT) | 120ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 4.5s |
| Số lần render `AssignmentCard` khi gõ search | Chưa được cung cấp |

Các giá trị Lighthouse ở trên do người dùng cung cấp, không phải số đo do repository tự sinh.

### Đo AFTER

Đo lại Lighthouse với cùng thiết bị, trình duyệt, URL và 10.000 assignments; ghi Performance, FCP, LCP, TBT, CLS và Speed Index. Trong React DevTools Profiler, bật **Record why each component rendered** nếu có, nhập cùng từ khóa search và đếm render của `AssignmentCard`. Chỉ điền các số liệu sau khi đã đo thực tế.

| Chỉ số | BEFORE | AFTER | Cải thiện |
|---|---:|---:|---:|
| Lighthouse Performance score | Chưa được cung cấp | | |
| FCP | 4.2s | | |
| LCP | 7.9s | | |
| TBT | 120ms | | |
| CLS | 0 | | |
| Speed Index | 4.5s | | |
| `AssignmentCard` renders khi gõ search | Chưa được cung cấp | | |
