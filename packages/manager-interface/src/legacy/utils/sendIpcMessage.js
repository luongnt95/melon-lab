const debug = require('debug')('melon-lab:manager-interface:sendIpcMessage');

let requestId = 0;

const sendIpcMessage = async (name, ...args) =>
  new Promise((resolve, reject) => {
    requestId++;
    debug('ipcMessage', name, requestId, ...args);

    const onSuccess = (event, responseId, ...result) => {
      if (requestId === responseId) {
        debug('ipcMessage Success', responseId, { result, args });
        removeListeners();
        resolve(...result);
      }
    };

    const onError = (event, responseId, error) => {
      if (requestId === responseId) {
        debug('ipcMessage Error', responseId, { error, args });
        removeListeners();
        reject(error);
      }
    };

    const removeListeners = () => {
      global.ipcRenderer.removeListener(`${name}-success`, onSuccess);
      global.ipcRenderer.removeListener(`${name}-error`, onSuccess);
    };

    global.ipcRenderer.on(`${name}-success`, onSuccess);
    global.ipcRenderer.on(`${name}-error`, onError);
    global.ipcRenderer.send(name, requestId, ...args);
  });

export default sendIpcMessage;
