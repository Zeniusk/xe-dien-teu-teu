// Kiểm tra trạng thái đăng nhập
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
    loadProducts();
    setupEventListeners();
});
let products = JSON.parse(localStorage.getItem('products')) || [
    { name: "XE MÁY ĐIỆN VINFAST EVO NEO", price: "18.000.000 đ", url: "xe2.html" },
    { name: "XE MÁY ĐIỆN YADEA VEKOO", price: "16.000.000 đ", url: "xe1.html" },
    { name: "XE MÁY ĐIỆN ESPERO DIAMOND PLUS 2025", price: "19.000.000 đ", url: "xe3.html" },
    { name: "XE ĐIỆN ESPERO T-REX", price: "14.000.000 đ", url: "xe4.html" },
    { name: "XE ĐIỆN YADEA IGO", price: "13.000.000 đ", url: "xe5.html" },
    { name: "XE ĐẠP ĐIỆN M133 MINI", price: "7.000.000 đ", url: "xe6.html" },
    { name: "XE GA 50CC KYMCO HERMOSA FI", price: "28.000.000 đ", url: "xe7.html" },
    { name: "XE GA 50CC KYMCO LIKE", price: "29.000.000 đ", url: "xe8.html" },
    { name: "XE GA 50CC SYM PRITI", price: "27.000.000 đ", url: "xe9.html" }
];
// Lưu mặc định vào localStorage nếu chưa có
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(products));
}
document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupEventListeners();
});
function setupEventListeners() {
    const addProductForm = document.getElementById("add-product");
    if (addProductForm) {
        addProductForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const name = document.getElementById("product-name").value.trim();
            const price = document.getElementById("product-price").value.trim();
            const url = document.getElementById("product-url").value.trim();

            if (name && price && url) {
                products.push({ name, price, url });
                localStorage.setItem('products', JSON.stringify(products));
                loadProducts();
                hideAddForm();
                clearForm();
                console.log("Sản phẩm đã được thêm:", { name, price, url });
            } else {
                alert("Vui lòng điền đầy đủ thông tin!");
                console.warn("Thiếu thông tin sản phẩm");
            }
        });
    }
}
function loadProducts() {
    const productList = document.getElementById("product-list");
    if (productList) {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td><a href="${product.url}" target="_blank">${product.url}</a></td>
                <td><button onclick="deleteProduct(${index})">Xóa</button></td>
            `;
            productList.appendChild(row);
        });
    }
}
function showAddForm() {
    const form = document.getElementById("add-product-form");
    if (form) form.style.display = "block";
}
function hideAddForm() {
    const form = document.getElementById("add-product-form");
    if (form) {
        form.style.display = "none";
        clearForm();
    }
}
function clearForm() {
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
    document.getElementById("product-url").value = "";
}
function deleteProduct(index) {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        loadProducts();
        console.log("Sản phẩm đã bị xóa tại index:", index);
    }
}
function logout() {
    if (confirm("Bạn có chắc muốn đăng xuất?")) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
        console.log("Đăng xuất thành công");
    }
}