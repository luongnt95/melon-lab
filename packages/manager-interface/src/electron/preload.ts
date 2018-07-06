import { ipcRenderer } from 'electron';

process.once('loaded', () => {
  global.isElectron = true;
  global.ipcRenderer = ipcRenderer;
});
