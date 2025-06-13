// Danh sách ảnh slide
const images = ["images/banner.jpg", "images/banner2.jpg", "images/banner3.jpg"];
let index = 0;
const products = [
    { name: "XE MÁY ĐIỆN VINFAST EVO NEO", price: "18.000.000 đ", url: "xe2.html" },
    { name: "XE MÁY ĐIỆN YADEA VEKOO", price: "16.000.000 đ", url: "xe1.html" },
    { name: "XE MÁY ĐIỆN ESPERO DIAMOND PLUS 2025", price: "19.000.000 đ", url: "xe3.html" },
    { name: "XE ĐIỆN ESPERO T-REX", price:"14.000.000 đ", url: "xe4.html"},
    { name: "XE ĐIỆN YADEA IGO", price:"13.000.000 đ", url: "xe5.html"},
    { name: "XE ĐẠP ĐIỆN M133 MINI", price:"7.000.000 đ", url: "xe6.html"},
    { name: "XE GA 50CC KYMCO HERMOSA FI", price:"28.000.000 đ", url: "xe7.html"},
    { name: "XE GA 50CC KYMCO LIKE", price:"29.000.000 đ", url: "xe8.html"},
    { name: "XE GA 50CC SYM PRITI", price:"27.000.000 đ", url: "xe9.html"}
];
// Banner
function showSlide() {
    const banner = document.getElementById("banner");
    if (banner) {
        const bannerImg = document.querySelector("#banner-img");
        if (bannerImg) {
            bannerImg.src = images[index];
        }
    }
}
function nextSlide() {
    index = (index + 1) % images.length;
    showSlide();
}
function prevSlide() {
    index = (index - 1 + images.length) % images.length;
    showSlide();
}
// Tự động chạy slide
// let slideInterval = null;
// const banner = document.getElementById("banner");
// if (banner) {
//     slideInterval = setInterval(nextSlide, 5000);
//     banner.addEventListener("mouseover", () => clearInterval(slideInterval));
//     banner.addEventListener("mouseout", () => {
//         slideInterval = setInterval(nextSlide, 5000);
//     });
// }
// Mở / Đóng modal
function openBill() {
    const bill = document.getElementById("bill");
    if (bill) bill.style.display = "block";
}
function closeBill() {
    const bill = document.getElementById("bill");
    if (bill) bill.style.display = "none";
}
window.onclick = function(event) {
    const modal = document.getElementById("bill");
    if (modal && event.target === modal) modal.style.display = "none";
};
// Gửi form mua hàng
function submitForm() {
    const hoVaTen = document.querySelector('input[name="ho-va-ten"]')?.value.trim() || '';
    const soDienThoai = document.querySelector('input[name="so-dien-thoai"]')?.value.trim() || '';
    const email = document.querySelector('input[name="email"]')?.value.trim() || '';
    const address = document.querySelector('input[name="address"]:checked')?.value || '';
    const thanhPho = document.querySelector('select[name="thanh-pho"]')?.value || '';
    const ghiChu = document.querySelector('input[name="ghi-chu"]')?.value.trim() || '';
    if (!hoVaTen || !thanhPho) {
        alert("Vui lòng nhập Họ và tên và Thành phố/Tỉnh!");
        return;
    }
    const productElement = document.querySelector('#info a.link h3');
    if (!productElement) {
        alert("Không tìm thấy thông tin sản phẩm. Vui lòng thử lại!");
        return;
    }
    const productName = productElement.textContent.trim();
    const productPrice = document.querySelector('#info .gia')?.textContent.trim() || "0 đ";
    const formData = {
        hoVaTen,
        soDienThoai,
        email,
        address,
        thanhPho,
        ghiChu,
        thoiGianDatHang: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })
    };
    const product = {
        name: productName,
        quantity: 1,
        price: productPrice,
        total: productPrice,
        customer: formData // Gắn form vào sản phẩm
    };
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    updateCartCount();
    window.location.href = 'giohang.html';
}
// Cập nhật số lượng sản phẩm
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const soHang = document.querySelector('.so-hang');
    if (soHang) soHang.textContent = cartItems.length;
}
// Hiển thị giỏ hàng
function displayCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const soHang = document.querySelector('.so-hang');
    const customerInfo = document.getElementById('customer-info');

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    if (cartItems.length > 0) {
        cartItemsDiv.innerHTML = '';
        cartItems.forEach((item, idx) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-detail" onclick="showCustomerInfo(${idx})" style="cursor:pointer;color:blue;">
                    ${item.name}
                </div>
                <div class="cart-item-quantity">${item.quantity}</div>
                <div class="cart-item-price">${item.price}</div>
                <div class="cart-item-total">${item.total}</div>
                <div class="cart-item-action"><button onclick="removeItem(${idx})">Xóa</button></div>
            `;
            cartItemsDiv.appendChild(cartItem);
        });
        soHang.textContent = cartItems.length;
    } else {
        cartItemsDiv.innerHTML = '<p>Giỏ hàng trống</p>';
        soHang.textContent = '0';
        customerInfo.style.display = 'none';
    }
}
// Hiển thị thông tin khách hàng của sản phẩm
function showCustomerInfo(index) {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const customerInfo = document.getElementById('customer-info');
    const item = cartItems[index];

    if (!item || !item.customer) {
        alert('Không có thông tin khách hàng cho sản phẩm này.');
        customerInfo.style.display = 'none';
        return;
    }
    const formData = item.customer;
    document.getElementById('info-ho-va-ten').textContent = formData.hoVaTen || 'Chưa nhập';
    document.getElementById('info-so-dien-thoai').textContent = formData.soDienThoai || 'Chưa nhập';
    document.getElementById('info-email').textContent = formData.email || 'Chưa nhập';
    document.getElementById('info-address').textContent = formData.address || 'Chưa chọn';
    document.getElementById('info-thanh-pho').textContent = formData.thanhPho || 'Chưa chọn';
    document.getElementById('info-ghi-chu').textContent = formData.ghiChu || 'Không có ghi chú';
    document.getElementById('info-thoi-gian-dat-hang').textContent = formData.thoiGianDatHang || '';
    customerInfo.style.display = 'block';
}
// Xóa sản phẩm
function removeItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCart();
}
// Tìm kiếm sản phẩm
function searchProducts() {
    const searchInput = document.querySelector('#search-box input');
    const searchButton = document.querySelector('#search-box button');
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') performSearch();
    });
    searchButton.addEventListener('click', performSearch);
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        if (query) {
            const matchedProduct = products.find(product =>
                product.name.toLowerCase().includes(query)
            );
            if (matchedProduct) {
                window.location.href = matchedProduct.url;
            } else {
                alert('Không tìm thấy sản phẩm phù hợp!');
            }
        } else {
            alert('Vui lòng nhập từ khóa!');
        }
    }
}
// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
    showSlide();
    updateCartCount();
    const nextBtn = document.getElementById("next");
    const prevBtn = document.getElementById("prev");
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);
    if (document.getElementById('cart-items')) displayCart();
    searchProducts();
});
