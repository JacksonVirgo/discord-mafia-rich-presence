const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const RPCClient = require('discord-rpc');

const { register, Client } = RPCClient;
const clientId = '1046423943352942693';
register(clientId);
const rpc = new Client({ transport: 'ipc' });
function updateActivity() {
	console.log('Refreshing Activity');
	rpc.setActivity({
		details: `Wanna play all things mafia?`,
		state: 'Join Discord Mafia!',
		largeImageKey: 'servericon',
		largeImageText: 'Join Discord Mafia!',
		smallImageKey: 'boticon',
		smallImageText: 'We have our own bot!',
		instance: false,
		buttons: [
			{
				label: 'Join Discord Mafia',
				url: 'https://discord.gg/social-deduction',
			},
		],
	});
}
rpc.on('ready', () => {
	console.log('READY READY READY');
	updateActivity();
	setInterval(updateActivity, 15e3);
});

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		width: 300,
		height: 300,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
		},
	});

	rpc.login({ clientId });

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
