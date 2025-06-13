document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();
        // Kiểm tra thông tin đăng nhập (giả lập)
        const validUsername = 'admin';
        const validPassword = 'admin';
        if (username === validUsername && password === validPassword) {
            // Đăng nhập thành công, lưu trạng thái và chuyển hướng
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'quanly.html';
            console.log('Đăng nhập thành công, chuyển đến quanly.html');
        } else {
            // Hiển thị thông báo lỗi
            errorMessage.textContent = 'Tài khoản hoặc mật khẩu không đúng!';
            errorMessage.style.display = 'block';
            console.warn('Đăng nhập thất bại:', { username, password });
        }
    });
});