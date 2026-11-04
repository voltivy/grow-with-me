const { app, BrowserWindow } = require('electron');
function create() {
  const w = new BrowserWindow({ width: 1100, height: 900, backgroundColor: '#171521', autoHideMenuBar: true });
  w.loadFile('index.html');
}
app.whenReady().then(create);
app.on('window-all-closed', () => app.quit());
