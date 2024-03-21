// Array untuk produk, di sini kita menaruh id, nama, dan harga
const produk = [
  { id: 1, nama: 'Pensil', harga: 1000 },
  { id: 2, nama: 'Buku Tulis', harga: 5000 }, 
  { id: 3, nama: 'Penghapus', harga: 2000},
];

// let dan const sama-sama untuk mendeklarasikan array 
// const digunakan apabila ingin menaruh nilai yang konsisten 
// let digunakan apabila nilai array ingin lebih fleksibel untuk diubah

let keranjang = []; // Array kosong untuk menaruh barang yang dipilih ke dalam keranjang

let totalHarga = 0; // Digunakan untuk menyimpan nilai total harga dari semua item yang ada di keranjang, nilai akan berubah sesuai dengan barang yang ada di keranjang

function cariProduk() { // Fungsi untuk mencari produk 
  const kodeProduk = document.getElementById('kode-produk').value;
  const produkDitemukan = produk.find(p => p.id == kodeProduk);
  if (produkDitemukan) {
    tampilkanProduk(produkDitemukan);
  } else {
    alert('Produk tidak ditemukan');
  }
}

function tampilkanProduk(produk) { // Fungsi untuk menampilkan produk dan nantinya akan menampilkan nama beserta harganya
  const infoProdukDiv = document.getElementById('info-produk');
  infoProdukDiv.innerHTML = `
    <div>
      ${produk.nama} - Rp${produk.harga}
      <input type="number" id="kuantitas-${produk.id}" class="shadow border rounded py-2 px-3" />
      <button onclick="tambahKeKeranjang(${produk.id})" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">Tambah ke Keranjang</button>
    </div>
  `;
}

function tambahKeKeranjang(idProduk) {
  // Fungsi untuk menambahkan produk ke dalam keranjang atau cart
  const kuantitasInput = document.getElementById(`kuantitas-${idProduk}`).value;
  const kuantitas = parseInt(kuantitasInput) || 1;
  const produkDitemukan = produk.find((p) => p.id === idProduk);
  const itemIndex = keranjang.findIndex((item) => item.id === idProduk);

  if (itemIndex > -1) {
    keranjang[itemIndex].kuantitas += kuantitas;
  } else {
    keranjang.push({ ...produkDitemukan, kuantitas });
  }
  tampilkanKeranjang();
}

function tampilkanKeranjang() {
  // Fungsi untuk menampilkan isi dari keranjang belanja pada halaman web.
  const keranjangDiv = document.getElementById("item-keranjang");
  keranjangDiv.innerHTML = keranjang
    .map(
      (item, indeks) => `
    <div class="flex justify-between mb-2 p-2 bg-gray-200">
      ${item.nama} - ${item.kuantitas} x Rp${item.harga}
      <div>
        <button onclick="ubahItemKeranjang(${indeks}, -1)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">-</button>
        <button onclick="ubahItemKeranjang(${indeks}, 1)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">+</button>
        <button onclick="hapusDariKeranjang(${indeks})" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Hapus</button>
      </div>
    </div>
  `
    )
    .join("");
    perbaruiTotal();
} // Memperbarui total setelah perubahan keranjang


// Fungsi untuk mengubah jumlah item dalam keranjang
function ubahItemKeranjang(indeks, perubahan) {
  if (keranjang[indeks].kuantitas + perubahan > 0) {
    keranjang[indeks].kuantitas += perubahan;
  } else {
    hapusDariKeranjang(indeks);
  }
  tampilkanKeranjang();
}


function hapusDariKeranjang(indeks) {
  keranjang.splice(indeks, 1);
  // Fungsi .splice() digunakan untuk menghapus item dari array.
  // indeks menentukan posisi item dalam array keranjang yang ingin dihapus.
  // Angka 1 menunjukkan bahwa kita ingin menghapus satu item saja dari posisi tersebut.
  tampilkanKeranjang();
  perbaruiTotal();
  // Setelah menghapus item dari keranjang, kita perlu memperbarui tampilan keranjang dan total harga.
}

function perbaruiTotal() {
  // Fungsi ini menghitung ulang total harga berdasarkan item-item yang ada di keranjang.
  totalHarga = keranjang.reduce((total, item) => total + (item.kuantitas * item.harga), 0 );
   // Menggunakan .reduce() untuk menjumlahkan total harga semua item.
  document.getElementById("jumlah-total").textContent = `Total: Rp${totalHarga}`;
  // Memperbarui tampilan total harga pada halaman web dengan total harga baru.
}

function prosesPembayaran() {
  // Fungsi untuk menangani proses pembayaran.
  const jumlahBayar = parseInt(
    document.getElementById("uang-dibayar").value,
    10 );
  if (!jumlahBayar || isNaN(jumlahBayar)) {
    alert("Silakan masukkan jumlah uang yang valid.");
    return;
  }
  if (jumlahBayar < totalHarga) {
    alert("Uang yang diberikan tidak cukup untuk melakukan pembayaran.");
    return;
  }

  const kembalian = jumlahBayar - totalHarga;
  document.getElementById("jumlah-kembalian").textContent = `Kembalian: Rp${kembalian}`;
  // array untuk menghitung kembalian dan memperbarui tampilan kembalian pada halaman web.
  
}

function tampilkanStruk() {
  const divStruk = document.getElementById("struk");
  const detailStrukDiv = document.getElementById("detail-struk");
  const totalStrukDiv = document.getElementById("total-struk");
  const pembayaranStrukDiv = document.getElementById("pembayaran-struk");
  const kembalianStrukDiv = document.getElementById("kembalian-struk");

  // Mengisi detail struk dan memastikan tidak ada undefined atau NaN
   detailStrukDiv.innerHTML = keranjang
     .map((item) => `${item.nama} - ${item.kuantitas} x Rp${item.harga}`)
     .join("<br>");


  // Total, pembayaran, dan kembalian
  totalStrukDiv.textContent = `Total: Rp.${totalHarga}`;
  pembayaranStrukDiv.textContent = `Uang Dibayarkan: Rp${
    document.getElementById("uang-dibayar").value
  }`;
  kembalianStrukDiv.textContent = `${
    document.getElementById("jumlah-kembalian").textContent
  }`;

  // Menampilkan struk pada halaman web.
  divStruk.classList.remove("hidden");
}
