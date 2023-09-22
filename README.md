## Note: Create database to run nodejs_basic

-- create a new table --
CREATE TABLE `users` (
`id` int not null primary key,
`firstname` VARCHAR(255) NULL,
`lastname` VARCHAR(255) NULL,
`email` VARCHAR(255) NULL,
`address` VARCHAR(255) NULL);
--

## libraries:

- multer : upload files.
- App-root-path: ko cần phải tìm đường path với ../../ để truy cập file. App-root-path giống '\_\_dirname'

# Middleware : Hoạt động như trạm thu phí giữa client và server

Dưới đây là cách hoạt động của Middleware mô tả chi tiết:
Yêu cầu (Request) từ Client đến Server:

Khi người dùng truy cập một trang web hoặc gửi một yêu cầu HTTP đến server, yêu cầu này đi qua Middleware trước khi đến server.
Xác thực và Phân quyền:

Middleware thường sẽ kiểm tra xem người dùng đã đăng nhập (authenticated) chưa, và nếu cần, xác thực họ (authentication). Điều này có thể liên quan đến việc kiểm tra token, cookie, hoặc thông tin đăng nhập khác.
Middleware cũng kiểm tra quyền truy cập của người dùng đối với tài nguyên hoặc chức năng cụ thể (authorization). Nếu người dùng không có quyền, Middleware có thể chuyển hướng (redirect) hoặc trả về lỗi phù hợp.
Xử lý Yêu cầu (Request Handling):

Sau khi xác thực và phân quyền, Middleware có thể thực hiện một số xử lý trước khi chuyển yêu cầu đến server chính (application server). Điều này có thể liên quan đến việc ghi nhật ký, nén dữ liệu, hoặc thậm chí là lưu trữ tạm thời (caching) kết quả để tăng hiệu suất.
Gửi Yêu cầu đến Server (Forward Request to Server):

Sau khi Middleware đã hoàn thành các nhiệm vụ của mình, nó chuyển tiếp yêu cầu đến server chính để xử lý tiếp theo.
Phản hồi (Response) từ Server đến Client:

Khi server hoàn thành xử lý yêu cầu và tạo ra một phản hồi HTTP, phản hồi này cũng sẽ đi qua Middleware trước khi trả về cho client.
Xử lý Phản hồi (Response Handling):

Middleware có thể xử lý phản hồi trước khi nó được trả về cho người dùng. Điều này có thể liên quan đến việc kiểm tra mã trạng thái của phản hồi, thêm thông tin vào phản hồi, hoặc nén phản hồi trước khi gửi đến trình duyệt của người dùng.

Middleware thường làm nhiệm vụ kiểm tra, xác thực, tăng hiệu suất, và xử lý nhiều khía cạnh của quá trình giao tiếp giữa client và server trong ứng dụng web.

code : app.use(req, res) => {..} <= simple middleware

library: morgan => HTTP request logger middleware for node.js
