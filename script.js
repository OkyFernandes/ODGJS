let items = [];

function addItem() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  if (name && !isNaN(price)) {
    items.push({ name, price });
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    renderItems();
  } else {
    alert("Nama dan harga barang harus diisi!");
  }
}

function searchItem() {
  const query = document.getElementById("search").value.toLowerCase();
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(query)
  );
  renderItems(filteredItems);
}

function renderItems(list = items) {
  const itemList = document.getElementById("item-list");
  itemList.innerHTML = list
    .map(
      (item, index) => `
    <div class="p-4 mb-2 bg-white flex justify-between items-center">
      ${item.name} - Rp${item.price}
      <button onclick="editItem(${index})" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs">Edit</button>
    </div>
  `
    )
    .join("");
}

function editItem(index) {
  const newName = prompt("Masukkan nama baru:", items[index].name);
  const newPrice = parseFloat(
    prompt("Masukkan harga baru:", items[index].price)
  );
  if (newName && !isNaN(newPrice)) {
    items[index] = { name: newName, price: newPrice };
    renderItems();
  } else {
    alert("Nama dan harga baru harus diisi!");
  }
}

function printReceipt() {
  const receiptDiv = document.getElementById("receipt");
  let receiptHtml = '<h3 class="mb-4">Struk Belanja</h3>';
  let total = 0;

  items.forEach((item) => {
    total += item.price;
    receiptHtml += `<div>${item.name}: Rp${item.price}</div>`;
  });

  receiptHtml += `<div class="mt-4">Total: Rp${total}</div>`;
  receiptDiv.innerHTML = receiptHtml;
}
