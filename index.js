const { app, BrowserWindow, Menu } = require("electron"); // Jangan lupa untuk impor Menu

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Menghilangkan menu bar
  Menu.setApplicationMenu(null);

  // Memuat file HTML utama aplikasi
  mainWindow.loadFile("index.html");

  // Buka DevTools 
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("activate", () => {
  // Pada macOS umumnya biasa untuk membuat jendela baru ketika ikon diklik dan tidak ada jendela lain yang terbuka.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  // Pada macOS aplikasi dan menu bar umumnya tetap aktif sampai pengguna keluar secara eksplisit dengan Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});
