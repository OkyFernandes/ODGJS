const { app, BrowserWindow } = require("electron");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800, // Perbaiki dari "heigth" ke "height" dan tambahkan "width"
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Tambahkan ini untuk menggunakan nodeIntegration dengan aman
    },
  });

  mainWindow.loadFile("index.html");
  mainWindow.webContents.openDevTools(); // Opsional: Buka DevTools untuk debugging
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
