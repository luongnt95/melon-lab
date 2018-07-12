let requestId = 0;

const sendIpcMessage = async (name, ...args) =>
  new Promise((resolve, reject) => {
    requestId++;
    console.log('ipcMessage', name, requestId, ...args);

    const onSuccess = (event, responseId, ...result) => {
      if (requestId === responseId) {
        console.log('ipcMessage Success', responseId, ...result);
        removeListeners();
        resolve(...result);
      }
    };

    const onError = (event, responseId, error) => {
      if (requestId === responseId) {
        console.log('ipcMessage Error', responseId, error);
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
