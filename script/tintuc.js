function openTab(event, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).classList.add("active");
    event.currentTarget.classList.add("active");
}
// Activate Login tab by default
document.getElementsByClassName("tablinks")[0].click();
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Đăng nhập thành công!');
});
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    if (password === confirmPassword) {
        alert('Đăng ký thành công!');
    } else {
        alert('Mật khẩu không khớp!');
    }
});