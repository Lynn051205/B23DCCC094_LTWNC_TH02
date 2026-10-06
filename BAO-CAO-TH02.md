# Báo cáo Bài thực hành số 2 – Student Deadline Tracker

## 1. Thông tin chung

- **Dự án:** Student Deadline Tracker
- **Nền tảng:** React, TypeScript, Vite
- **Mục tiêu:** Theo dõi bài tập theo môn học, deadline, trạng thái hoàn thành và hỗ trợ kiểm tra hiệu năng với danh sách lớn.
- **Phạm vi báo cáo:** Tổng hợp những gì quan sát được trong 5 ảnh chụp màn hình do người thực hiện cung cấp. Báo cáo không thay thế số liệu đo Lighthouse hoặc kết quả export từ React DevTools Profiler.

## 2. Chức năng thể hiện trong ảnh

Giao diện danh sách bài tập có:

- Tìm kiếm theo tên bài tập hoặc môn học.
- Các bộ lọc **Tất cả**, **Đang làm**, **Hoàn thành**, **Quá hạn**, kèm số lượng theo trạng thái.
- Nút tạo 10.000 bài tập mẫu.
- Thao tác đánh dấu hoàn thành, ghim và xóa bài tập.
- Thống kê tổng số bài tập và số bài đã hoàn thành.
- Giao diện sáng/tối.

Các ảnh chụp cho thấy danh sách thay đổi sau thao tác:

| Trạng thái hiển thị trong ảnh | Tổng | Đang làm | Hoàn thành | Quá hạn |
|---|---:|---:|---:|---:|
| Danh sách có ba bài tập | 3 | 1 | 1 | 1 |
| Sau khi danh sách có thêm bài tập | 4 | 0 | 1 | 3 |
| Danh sách có năm bài tập | 5 | 1 | 1 | 3 |

Các con số trên là số liệu giao diện hiển thị trong ảnh, không phải số liệu Lighthouse.

## 3. Quản lý state và Redux Logger

Trong ảnh DevTools Console, Redux Logger hiển thị các action:

- `assignments/addAssignment`
- `assignments/deleteAssignment`

Mỗi action có các phần `prev state`, `action` và `next state`, giúp theo dõi thay đổi Redux state sau thao tác trên giao diện. Ảnh cung cấp có log thêm bài tập và log xóa bài tập; không thấy rõ action hoàn thành trong các ảnh này.

Giao diện cũng thể hiện trạng thái ghim và chuyển theme. Các ảnh chưa đủ để xác nhận toàn bộ tình huống hoặc kiểm tra persistence sau khi tải lại trang.

## 4. Kiểm tra React DevTools Profiler

Ảnh chụp Profiler cho thấy component tree của ứng dụng, gồm Redux Provider, Theme Provider, HomePage, danh sách và các assignment card. Một ảnh ghi nhận commit sau khi đổi theme; ảnh khác cho thấy Profiler đang chọn HomePage trong lúc nhập nội dung tìm kiếm.

Một số thời gian render/commit nhỏ xuất hiện trong giao diện Profiler của ảnh, nhưng ảnh không cung cấp bản export, điều kiện chạy, cấu hình thiết bị, hoặc đầy đủ chi tiết để tạo phép so sánh đáng tin cậy. Vì vậy, báo cáo **không coi các số hiển thị nhỏ đó là benchmark chính thức** và không suy ra tổng số lần render của `AssignmentCard`.

## 5. Kết quả Lighthouse và đo hiệu năng

Trong bộ ảnh được cung cấp không thấy báo cáo Lighthouse với các chỉ số:

- Lighthouse Performance score
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Total Blocking Time (TBT)
- Cumulative Layout Shift (CLS)
- Speed Index

Do đó, hiện chưa thể lập so sánh BEFORE/AFTER hoặc kết luận mức cải thiện hiệu năng từ ảnh. Cần chạy Lighthouse và ghi lại kết quả thực tế với cùng trình duyệt, thiết bị, trạng thái ứng dụng và 10.000 bài tập.

Tương tự, ảnh Profiler chưa cho biết rõ số lần render `AssignmentCard` khi gõ search. Chỉ số này cần được ghi trực tiếp trong một phiên profiling có đánh dấu thao tác tìm kiếm.

## 6. Kết luận

Các ảnh minh họa ứng dụng hoạt động với danh sách bài tập, bộ lọc trạng thái, thống kê số lượng và các thao tác thêm/xóa/ghim/hoàn thành. DevTools Console cũng hiển thị Redux action log, còn React DevTools Profiler đã được sử dụng để quan sát component tree và commit.

Tuy nhiên, ảnh hiện có chưa cung cấp đủ số liệu Lighthouse hoặc số lần render card để chứng minh định lượng hiệu quả tối ưu. Cần bổ sung kết quả đo Lighthouse AFTER và số lần render trong Profiler trước khi đưa ra kết luận về mức cải thiện.

## 7. Minh chứng

Minh chứng là 5 ảnh chụp màn hình được người thực hiện cung cấp trong phiên làm việc này:

1. Danh sách bài tập và log Redux Logger trong Console.
2. Giao diện tối và React DevTools Profiler.
3. Kết quả tìm kiếm và React DevTools Profiler.
4. Giao diện danh sách sau khi số lượng bài tập thay đổi cùng log Redux.
5. Danh sách bài tập và các action log trong Console.
