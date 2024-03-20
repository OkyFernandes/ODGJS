// array untuk produk disini kita menaruh id, name, price
const products = [
  { id: 1, name: 'Pensil', price: 1000 },
  { id: 2, name: 'Buku Tulis', price: 5000 }, 
  { id: 3, name: 'Penghapus', price: 2000},

];

// let dan conts sama sama array 
// const digunakan apabila ingin menaruh nilai yang konsisten 
// let digunakan apabila ingin lebih fleksible untuk merubah seluruh array

let cart = [];// array kosong untuk menruh barang yang dipilih ke dalam keranjang

let totalAmount = 0;// array kosong digunakan untuk menyimpan nilai total harga dari semua item yang ada di keranjang, nlai akan berubah sesuai dengan barang yang ada di keranjang

function searchProduct() { // function untuk mencari produk 
  const productCode = document.getElementById('product-code').value;
  const product = products.find(p => p.id == productCode);
  if (product) {
    displayProduct(product);
  } else {
    alert('Produk tidak ditemukan');
  }
}

function displayProduct(product) { // function untuk menampilkan produk dan nantinya akan menampilkan nama beserta harganya
  const productInfoDiv = document.getElementById('product-info');
  productInfoDiv.innerHTML = `
    <div>
      ${product.name} - Rp${product.price}
      <input type="number" id="quantity-${product.id}" class="shadow border rounded py-2 px-3" />
      <button onclick="addToCart(${product.id})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Tambah ke Keranjang</button>
    </div>
  `;
}

function addToCart(productId) { // function untuk menambahkan produk kedalam keranjang atau cart
  const product = products.find(p => p.id === productId);
  const quantityInput = document.getElementById(`quantity-${productId}`);
  const quantity = parseInt(quantityInput.value, 10) || 1;
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
  renderCart();
}

function renderCart() {
  //function untuk menampilkan isi dari keranjang belanja pada halaman web. Ia melakukan beberapa tugas penting untuk memperbarui tampilan keranjang belanja setiap kali terjadi perubahan, seperti penambahan atau penghapusan item.
  const cartDiv = document.getElementById("cart-items"); // digunakan untuk mencari elemen HTML dengan ID cart-items di halaman web. Elemen ini digunakan untuk menampilkan item-item yang ada di keranjang belanja. const cartDiv adalah variabel yang menyimpan referensi ke elemen tersebut.
  cartDiv.innerHTML = cart
    .map(
      //untuk beriterasi melalui setiap item dalam array cart. Untuk setiap item, ia mengembalikan string HTML yang merepresentasikan item tersebut, termasuk nama produk, jumlah yang dibeli, dan harganya. Setiap item diwakili sebagai div dengan beberapa button (-, +, dan Hapus) untuk mengubah jumlah atau menghapus item dari keranjang.
      (item, index) => `
    <div class="flex justify-between mb-2 p-2 bg-gray-200">
      ${item.product.name} - ${item.quantity} x Rp${item.product.price}
      <>
        <button onclick="editCartItem(${index}, -1)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">-</button> 

        <button onclick="editCartItem(${index}, 1)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">+</button>

        <button onclick="removeFromCart(${index})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Hapus</button>
      </div>
    </div>
  `
      // onclick="editCartItem(${index}, -1)" adalah handler yang dipicu saat button - di klik Ini memanggil fungsi editCartItem dengan index item di keranjang dan -1 sebagai argumen untuk mengurangi jumlah item yang ada di cart.

      // onclick="editCartItem(${index}, 1)" adalah handler yang dipicu saat button  + diklik. Ini memanggil fungsi editCartItem dengan index item di keranjang dan 1 sebagai argumen untuk menambah jumlah item yang ada di cart.

      // onclick="removeFromCart(${index})" adalah handler yang dipicu saat button Hapus diklik. Ini memanggil fungsi removeFromCart dengan index item sebagai argumen untuk menghapus item dari keranjang.
    )
    .join(""); // digunakan untuk menggabungkan semua string HTML yang dihasilkan oleh .map() menjadi satu string besar. String ini kemudian ditetapkan sebagai innerHTML dari cartDiv, yang menggantikan konten sebelumnya dengan tampilan terbaru dari keranjang.

  updateTotal(); // Memperbarui total setelah perubahan keranjang
}

// Fungsi untuk mengedit jumlah item dalam keranjang
function editCartItem(index, change) {
  // Perbarui jumlah item di keranjang atau hapus jika jumlahnya 0
  const newQuantity = cart[index].quantity + change;
  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
  } else {
    removeFromCart(index);
  }
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  //cart adalah array yang menyimpan item-item yang telah di tambahkan ke keranjang belanja. Dalam konteks nyata, setiap item dalam array ini memiliki detail seperti nama produk, harga, dan jumlah
  //.splice() adalah metode (fungsi) dari array yang digunakan untuk menambah atau menghapus item dari array.
  //index adalah posisi item dalam array cart yang ingin di hapus. Index dimulai dari 0, jadi jika index adalah 1, itu artinya menghapus item kedua dalam keranjang. Angka 1 setelah index menunjukkan berapa banyak item yang ingin dihapus, yang dalam kasus ini hanya 1 item saja.
  renderCart();
  //renderCart(); digunakan setelah item dihapus, jika ingin memperbarui tampilan keranjang belanja agar pengguna dapat melihat keranjang yang sudah diperbaharui tanpa item yang baru saja dihapus. Fungsi renderCart() bertugas untuk itu. Ia mengambil item-item yang tersisa dalam array cart dan menampilkan ulang mereka di halaman web. 
  updateTotal();
}

function updateTotal() {
  // function ini digunakan untuk menghitung total harga dari semua item yang ada di keranjang belanja dan menampilkan total tersebut pada halaman web setiap kali updateTotal() dipanggil, halaman web akan diperbarui untuk menunjukkan total harga terkini dari semua item di keranjang.
  totalAmount = cart.reduce(
    (total, item) => total + item.quantity * item.product.price,
    0
  ); // cara untuk mengakumulasi nilai dari semua item dalam array cart. Metode .reduce() mengambil sebuah fungsi dan nilai awal (dalam kasus ini, 0) sebagai argumen.

  document.getElementById(
    "total-amount"
  ).textContent =  // digunakan untuk mendapatkan elemen HTML di halaman web yang memiliki ID total-amount. ini ini adalah elemen untuk menampilkan total harga
  `Total: Rp${totalAmount}`; // digunakan untuk menetapkan teks dari elemen tersebut menjadi string yang menunjukan total harga, dengan memasukan nilai dari total-amount yang telah dihitung sebelumnya
}

function processPayment() {
  const amountPaid = parseInt(document.getElementById('amount-paid').value, 10);
  if (!amountPaid || isNaN(amountPaid)) {
    alert('Silakan masukkan jumlah uang yang valid.');
    return;
  }
  if (amountPaid < totalAmount) {
    alert('Uang yang diberikan tidak cukup untuk melakukan pembayaran.');
    return;
  }

  const change = amountPaid - totalAmount;
  document.getElementById('change-amount').textContent = `Kembalian: Rp${change}`;
  
  
}

function displayReceipt() {
  const receiptDiv = document.getElementById('receipt');
  const receiptDetailsDiv = document.getElementById('receipt-details');
  const receiptTotalDiv = document.getElementById('receipt-total');
  const receiptPaymentDiv = document.getElementById('receipt-payment');
  const receiptChangeDiv = document.getElementById('receipt-change');

  // Mengisi detail struk
  receiptDetailsDiv.innerHTML = cart.map(item => `${item.product.name} - ${item.quantity} x Rp${item.product.price}`).join('<br>');

  // Total, pembayaran, dan kembalian
  receiptTotalDiv.textContent = `Total: Rp${totalAmount}`;
  receiptPaymentDiv.textContent = `Uang Dibayarkan: Rp${document.getElementById('amount-paid').value}`;
  receiptChangeDiv.textContent = `${document.getElementById('change-amount').textContent}`;

  // Menampilkan struk
  receiptDiv.classList.remove('hidden');
}


