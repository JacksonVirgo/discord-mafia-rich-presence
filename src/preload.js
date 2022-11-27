const { ipcRenderer } = require('electron');
console.log('PRELOAD');
ipcRenderer.send('hello', JSON.stringify({}));
