/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, protocol  } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath, resolveReactRoute } from './util';
import fs from 'fs';
import { execFile } from 'child_process';
import { spawn } from 'child_process';
import kill from 'tree-kill';

const isDevelopment = process.env.NODE_ENV !== 'production';
let sessionFileName: string;
let patientFileName: string;
let paradigmFileName: string;
let sessionResult: string;
let assessmentFileName: string;

let serverPath: string;

if (isDevelopment) {
  sessionFileName = path.join(__dirname, '..','..', 'DB','sessions' ,'session.json');
  patientFileName = path.join(__dirname, '..','..', 'DB', 'patients', 'patient.json');
  paradigmFileName = path.join(__dirname, '..','..', 'DB', 'paradigm', 'paradigm.json');
  sessionResult = path.join(__dirname, '..','..', 'DB', 'SessionResult', 'SessionResult.json');
  assessmentFileName = path.join(__dirname, '..','..', 'DB', 'assessments', 'assessment.json');

  serverPath = path.join(__dirname, '..', '..', 'QDIC-Server', 'server.js');
} else {
  const userDataPath = app.getPath('userData');
  // const userName = userDataPath.split("/")[1];
  sessionFileName = path.join(`C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources`,  'DB','sessions' ,'session.json');
  patientFileName = path.join(`C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources`, 'DB', 'patients', 'patient.json');
  paradigmFileName = path.join(`C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources`, 'DB', 'paradigm', 'paradigm.json');
  sessionResult = path.join(`C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources`, 'DB', 'SessionResult', 'SessionResult.json');
  assessmentFileName = path.join(`C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources`, 'DB', 'assessments', 'assessment.json');

  serverPath = `C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources/QDIC-Server/server.js`
}

//socket service
const net = require('net');

let check = 1;
const PORT = 8254; //production
// const PORT = 8245; //development
const HOST = '0.0.0.0'
// const HOST = '192.168.137.47'
let ch_data,paradigm_data;

const client = new net.Socket();

let timeid = null;
let socketIntervalId = null;

let client_status = 0;

client.on('data', (data) => {
  try{
    console.log(data.toString("utf8"));
    
    data = JSON.parse(data.toString("utf8"));
    // console.log('Data: ',data);
    let res =  {"paradigm":{"start_time":"HH:MM:SS", "end_time": "HH:MM:SS", "result":0}}
    if(data.hasOwnProperty('contact_quality')){
        //console.log(data['contact_quality']);
        mainWindow?.webContents.send('contact_quality',JSON.stringify(data));
        childWindow?.webContents.send('contact_quality',JSON.stringify(data));
    } else if(data.hasOwnProperty('paradigm')){
      childWindow?.webContents.send('paradigm',JSON.stringify(data));
      console.log('paradigmRes');
      mainWindow?.webContents.send('paradigmRes',JSON.stringify(data));
    } else if(data.hasOwnProperty('live_data')){
      childWindow2?.webContents.send('live_data',data);
    } else if(data.hasOwnProperty('c_client_connected')){
      client_status = 1;
      mainWindow?.webContents.send('client_status',JSON.stringify(data));
    }
  } catch(e) {
    console.log("Error on data received from server: ",e);
  }
});

client.on('error', function(e) {
  console.log('Error: connecting client: ',e);
  mainWindow?.webContents.send('client_status',"disconnected");
  setTimeout(() => {
    client.connect(PORT,HOST, function() { //'connect' listener
      console.log('client connected');
      mainWindow?.webContents.send('client_status',"connected");
    });
  }, 5000);
});

client.on('end', function() {
  console.log('client disconnected');
  // mainWindow?.webContents.send('check_client_status',"disconnected");
  // setTimeout(() => {
  //   client.connect(PORT,HOST, function() { //'connect' listener
  //     console.log('client connected');
  //   });
  // }, 5000);
});

// server code
let child1 = null, child2 = null;
// let rootPath = path.dirname(require.main!.filename);
// console.log(rootPath);

// spawn('npm', ['install'], { cwd: 'DIR' });

// const install = spawn('npm', ['install'], { cwd:  `C:/Users/${app.getPath('userData').split("\\")[2]}/electron-react-boilerplate/Local/Programs/ABHA/resources/QDIC-Server`})

// install.stdout.on('data', (data) => {
//   console.log(`Server stdout: ${data}`);
// });

// install.stderr.on('data', (data) => {
//   console.error(`Server stderr: ${data}`);
// });

// install.on('close', (code) => {
//   console.log(`Server process exited with code ${code}`);
// });

// const serverProcess = spawn('node', [serverPath]);

// serverProcess.stdout.on('data', (data) => {
//   console.log(`Server stdout: ${data}`);
// });

// serverProcess.stderr.on('data', (data) => {
//   console.error(`Server stderr: ${data}`);
// });

// serverProcess.on('close', (code) => {
//   console.log(`Server process exited with code ${code}`);
// });

if (isDevelopment) {
  const installCommand = `cd ${path.join(__dirname, '..', '..', 'QDIC-Server')} ${'&&'} npm install`;
  child1 = spawn(installCommand, {
    shell: true
  });
  
  child1.stderr.on('data', function (data) {
    console.error("STDERR:", data.toString());
  });
  child1.stdout.on('data', function (data) {
    console.log("STDOUT:", data.toString());
  });
  child1.on('exit', function (exitCode) {
    console.log("Child exited with code: " + exitCode);
  });

  const runServerCommand = `node ${serverPath}`;
  child2 = spawn(runServerCommand, {
    shell: true
  });
  
  child2.stderr.on('data', function (data) {
    console.error("STDERR:", data.toString());
  });
  child2.stdout.on('data', function (data) {
    console.log("STDOUT:", data.toString());
  });
  child2.on('exit', function (exitCode) {
    console.log("Child exited with code: " + exitCode);
  });
} else{
  const installCommand = `node C:/Users/${app.getPath('userData').split("\\")[2]}/AppData/Local/Programs/ABHA/resources/QDIC-Server/server.js`;
  child2 = spawn(installCommand, {
    shell: true
  });
  
  child2.stderr.on('data', function (data) {
    console.error("STDERR:", data.toString());
  });
  child2.stdout.on('data', function (data) {
    console.log("STDOUT:", data.toString());
  });
  child2.on('exit', function (exitCode) {
    console.log("Child exited with code: " + exitCode);
  });

  // const runServerCommand = `node ${serverPath}`;
  // child2 = spawn(runServerCommand, {
  //   shell: true
  // });
  
  // child2.stderr.on('data', function (data) {
  //   console.error("STDERR:", data.toString());
  // });
  // child2.stdout.on('data', function (data) {
  //   console.log("STDOUT:", data.toString());
  // });
  // child2.on('exit', function (exitCode) {
  //   console.log("Child exited with code: " + exitCode);
  // });
}

// ******************************************************************* Backend Service **************************************************

import * as dbModule from './ipcCommunication';

//Session
ipcMain.on('addSession', async (event,arg) => {
  console.log("addSession");
  const res = dbModule.addSession(arg,sessionFileName);
  event.reply('addSession', res);
});

ipcMain.on('getSessionData', async (event,arg) => {
  console.log("getSessionData");
  const res = dbModule.getSessionData(sessionFileName);
  event.reply('getSessionData', res);
});

ipcMain.on('getSessionByPatientId', async (event,arg) => {
  console.log("getSessionByPatientId");
  const res = dbModule.getSessionByPatientId(arg,sessionFileName);
  event.reply('getSessionByPatientId', res);
});

ipcMain.on('getUpcomingSessions', async (event,arg) => {
  console.log("getUpcomingSessions");
  const res = dbModule.getUpcomingSessions(sessionFileName);
  event.reply('getUpcomingSessions', res);
});

ipcMain.on('getTopUpcomingSessions', async (event,arg) => {
  console.log("getTopUpcomingSessions");
  const res = dbModule.getTopUpcomingSessions(sessionFileName);
  event.reply('getTopUpcomingSessions', res);
});

ipcMain.on('getPastSessions', async (event,arg) => {
  console.log("getPastSessions");
  const res = dbModule.getPastSessions(sessionFileName);
  event.reply('getPastSessions', res);
});

ipcMain.on('getNewSES', async (event,arg) => {
  console.log("getNewSES");
  const res = dbModule.getNewSES(sessionFileName);
  event.reply('getNewSES', res);
});

ipcMain.on('updateSessionStatus', async (event,arg) => {
  console.log("updateSessionStatus");
  let data = JSON.parse(arg);
  const res = dbModule.updateSessionStatus(data?.id,data?.status,sessionFileName);
  event.reply('updateSessionStatus', res);
});

// Patient
ipcMain.on('addPatient', async (event,arg) => {
  console.log("addPatient");
  const res = dbModule.addPatient(arg,patientFileName);
  event.reply('addPatient', res);
});

ipcMain.on('getAllPatient', async (event,arg) => {
  console.log("getAllPatient");
  const res = dbModule.getAllPatientData(patientFileName);
  event.reply('getAllPatient', res);
});

ipcMain.on('getRecoveredPatientData', async (event,arg) => {
  console.log("getRecoveredPatientData");
  const res = dbModule.getRecoveredPatientData(patientFileName);
  event.reply('getRecoveredPatientData', res);
});

ipcMain.on('getNotRecoveredPatientData', async (event,arg) => {
  console.log("getNotRecoveredPatientData");
  const res = dbModule.getNotRecoveredPatientData(patientFileName);
  event.reply('getNotRecoveredPatientData', res);
});

ipcMain.on('getPatientDetailsById', async (event,arg) => {
  console.log("getPatientDetailsById", arg);
  const res = dbModule.getPatientDetailsById(arg,patientFileName);
  event.reply('getPatientDetailsById', res);
});

ipcMain.on('getNewPID', async (event,arg) => {
  console.log("getNewPID");
  const res = dbModule.getNewPID(patientFileName);
  event.reply('getNewPID', res);
});

// Paradigms
ipcMain.on('getParadigms', async (event,arg) => {
  console.log("getParadigms");
  const res = dbModule.getParadigmsData(paradigmFileName);
  const newData = {
    items: Array.isArray(res.items) ? res.items.map(item => {
      return {
        ...item,
        trials: Array.isArray(item.trials) ? item.trials.map(trial => {
          if (trial.type === "video" && trial.url === "leftHand") {
            const RESOURCES_PATH = app.isPackaged
              ? path.join(process.resourcesPath, 'assets','left-hand.mp4')
              : path.join(__dirname, '../renderer/assets','left-hand.mp4');
            return { ...trial, url: RESOURCES_PATH};
          } else if (trial.type === "video" && trial.url === "rightHand") {
            const RESOURCES_PATH = app.isPackaged
              ? path.join(process.resourcesPath, 'assets','right-hand.mp4')
              : path.join(__dirname, '../renderer/assets','right-hand.mp4');
            return { ...trial, url: RESOURCES_PATH};
          }
          return trial;
        }) : item.trials
      };
    }) : res.items
  };
  event.reply('getParadigms', newData);
});

ipcMain.on('getParadigmById', async (event,arg) => {
  console.log("getParadigmById", arg);
  const res = dbModule.getParadigmById(arg,paradigmFileName);
  // console.log(res?.trials);
  
  const newData = {
    ...res,
    trials: Array.isArray(res?.trials)
      ? res?.trials.map((trial) => {
          if (trial.type === "video" && trial.url === "leftHand") {
            const RESOURCES_PATH = app.isPackaged
              ? path.join(process.resourcesPath, "assets", "left-hand.mp4")
              : path.join(__dirname, "../renderer/assets", "left-hand.mp4");
            return { ...trial, url: RESOURCES_PATH };
          } else if (trial.type === "video" && trial.url === "rightHand") {
            const RESOURCES_PATH = app.isPackaged
              ? path.join(process.resourcesPath, "assets", "right-hand.mp4")
              : path.join(__dirname, "../renderer/assets", "right-hand.mp4");
            return { ...trial, url: RESOURCES_PATH };
          } else {
            return { ...trial };
          }
        })
      : res?.trials,
  };

  // console.log(newData);
  event.reply('getParadigmById', newData);
});
//updatePatientStatus
ipcMain.on('updatePatientStatus', async (event,arg) => {
  console.log("updatePatientStatus");
  const res = dbModule.updatePatientStatus(arg,patientFileName);
  event.reply('updatePatientStatus', res);
});


// results

ipcMain.on('saveSessionResult', async (event,arg) => {
  console.log("saveSessionResult");
  const res = dbModule.saveSessionResult(arg,sessionResult);
  event.reply('saveSessionResult', res);
});

ipcMain.on('getSessionResultById', async (event,arg) => {
  console.log("getSessionResultById");
  const res = dbModule.getSessionResultById(arg,sessionResult);
  event.reply('getSessionResultById', res);
});

ipcMain.on('getSessionResultData', async (event,arg) => {
  console.log("getSessionResultData");
  const res = dbModule.getSessionResultData(sessionResult);
  event.reply('getSessionResultData', res);
});

ipcMain.on('getSessionResultByPatientId', async (event,arg) => {
  console.log("getSessionResultByPatientId");
  const res = dbModule.getSessionResultByPatientId(arg,sessionResult);
  event.reply('getSessionResultByPatientId', res);
});

// assessment

ipcMain.on('getNewASSES', async (event,arg) => {
  console.log("getNewASSES");
  const res = dbModule.getNewASSES(assessmentFileName);
  event.reply('getNewASSES', res);
});

ipcMain.on('getAssesmentData', async (event,arg) => {
  console.log("getAssesmentData");
  const res = dbModule.getAssesmentData(assessmentFileName);
  event.reply('getAssesmentData', res);
});

ipcMain.on('addAssesment', async (event,arg) => {
  console.log("addAssesment");
  const res = dbModule.addAssesment(arg,assessmentFileName);
  event.reply('addAssesment', res);
});

// ***************************************************** Backend Service Ends ************************************************************

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let childWindow: BrowserWindow | null = null;
let childWindow2: BrowserWindow | null = null;

// Paradigm events
ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.on('brian-image', async (event, arg) => {

    const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
    console.log("main",msgTemplate(arg));
    // event.reply('brian-image', msgTemplate('wink'));

    const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

    childWindow = new BrowserWindow({
      show: false,
      width: 400,
      height:450,
      resizable: false,
      autoHideMenuBar: true,
      icon: getAssetPath('Ba_logo.png'),
      alwaysOnTop:true,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
        webSecurity:false,
        devTools: false
      }
    });
    childWindow.loadURL("http://localhost:1212/#/brainimgchild")

    childWindow.show();

});

ipcMain.on('check_client_status', async (event, arg) => {
  const msgTemplate = (arg: string) => `check_client_status: ${arg}`;
  console.log(msgTemplate(arg));
  if(client){
    event.reply('check_client_status', "connected");
  } else {
    event.reply('check_client_status', "disconnected");
  }
});

ipcMain.on('connect_to_server', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `connect_to_server: ${pingPong}`;
  console.log(msgTemplate(arg));
  try{
    if(!client)
      client.connect(PORT,HOST, function() { //'connect' listener
        console.log('client connected');
        event.reply('connect_to_server', "connected");
      });
    else 
      event.reply('connect_to_server', "already connected");
  }catch(e){
    console.log("Error Server:",e);
  }
});

ipcMain.on('contact_quality_check', async (event, arg) => {
  const msgTemplate = (arg: string) => `contact_quality_check: ${arg}`;
  console.log(msgTemplate(arg));
  try{
    client.write('{"contact_quality_check":"check"}');
    event.reply('contact_quality_check', msgTemplate(arg));
  }catch(e){
    console.log("Error Server:",e);
  }
});

ipcMain.on('paradigm_start', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `paradigm_start: ${pingPong}`;
  console.log(msgTemplate(JSON.parse(arg)));
  client.write(arg);
  event.reply('paradigm_start', msgTemplate(JSON.parse(arg)));
});

ipcMain.on('stop_live_data', async (event, arg) => {
  const msgTemplate = (arg: string) => `stop_live_data: ${arg}`;
  console.log(msgTemplate(arg));
  client.write('{"stop_live_data":"stop"}');
  event.reply('stop_live_data', msgTemplate(arg));
});

ipcMain.on('start_live_data', async (event, arg) => {
  const msgTemplate = (arg: string) => `start_live_data: ${arg}`;
  console.log(msgTemplate(arg));
  client.write('{"start_live_data":"start"}');
  event.reply('start_live_data', msgTemplate(arg));
});

// open child windows

ipcMain.on('trialmain', async (event, arg) => {
  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};
  
  let data = JSON.parse(arg);
  // console.log("trialmain: ",data);
  if(data.Status==='open'){
    childWindow = new BrowserWindow({
      show: false,
      fullscreen: true,
      icon: getAssetPath('Ba_logo.png'),
      autoHideMenuBar: true,
      title: "ABHA",
      alwaysOnTop:true,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
        webSecurity:false,
        devTools: false
      }
    });
    // console.log(`http://localhost:1212/#/trialmain/${data.paradigm}/${data.loop}`);
    app.isPackaged ? 
    childWindow.loadURL(resolveReactRoute('index.html',`/trialmain/${data.paradigm}/${data.loop}`)) :
    childWindow.loadURL(`http://localhost:1212/#/trialmain/${data.paradigm}/${data.loop}`)

    mainWindow?.webContents.send('trialmainResponse',resolveReactRoute('index.html',`/trialmain/${data.paradigm}/${data.loop}`));
    childWindow.show();

  } else if(data.Status==='close'){
    client.write('{"paradigm_stop":"stop"}');
    if(childWindow)
      childWindow.close();
      mainWindow?.webContents.send('childWindowClosed','close');

  } else if(data.Status==='paradigm_stop'){
    client.write('{"paradigm_stop":"stop"}');
  }

  childWindow?.on('closed', () => {
    ipcMain.emit('childWindowClosed','close');
    childWindow = null;
  });

});

ipcMain.on('calibmain', async (event, arg) => {
  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};
  
  let data = JSON.parse(arg);
  console.log("calibmain: ",data);
  if(data.Status==='open'){
    childWindow = new BrowserWindow({
      show: false,
      fullscreen: true,
      icon: getAssetPath('Ba_logo.png'),
      autoHideMenuBar: true,
      title: "ABHA",
      alwaysOnTop:true,
      webPreferences: {
        nodeIntegration:true,
        contextIsolation:false,
        webSecurity:false,
        devTools: true
      }
    });
    // console.log(`http://localhost:1212/#/trialmain/${data.paradigm}/${data.loop}`);
    app.isPackaged ? 
    childWindow.loadURL(resolveReactRoute('index.html',`/calibration/${data.paradigm}/${data.loop}`)) :
    childWindow.loadURL(`http://localhost:1212/#/calibration/${data.paradigm}/${data.loop}`)

    mainWindow?.webContents.send('calibResponse',resolveReactRoute('index.html',`/calibration/${data.paradigm}`));
    childWindow.show();

  } else if(data.Status==='paradigm_stop'){
    client.write('{"paradigm_stop":"stop"}');
  } 
  else {
    client.write('{"paradigm_stop":"stop"}');
    if(childWindow)
      childWindow.close();
      mainWindow?.webContents.send('childWindowClosed','close');
  }

  childWindow?.on('closed', () => {
    ipcMain.emit('childWindowClosed','close');
    childWindow = null;
  });

});

ipcMain.on('plotWindow', async (event, arg) => {
  const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'assets')
  : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  
  let data = JSON.parse(arg);
  console.log("plotWindow: ",data);
  childWindow2 = new BrowserWindow({
    show: false,
    icon: getAssetPath('Ba_logo.png'),
    autoHideMenuBar: true,
    title: "ABHA",
    webPreferences: {
      nodeIntegration:true,
      contextIsolation:false,
      webSecurity:false,
      devTools: true
    }
  });
  app.isPackaged ? 
  childWindow2.loadURL(resolveReactRoute('index.html',`/plot_data`)) :
  childWindow2.loadURL(`http://localhost:1212/#/plot_data`)

  childWindow2.show();
  client.write('{"start_live_data":"start"}');

  // childWindow2.on('close', () => {
  //   client.write('{"stop_live_data":"stop"}');
  // });

  childWindow2?.on('closed', () => {
    ipcMain.emit('childWindowClosed','close');
    client.write('{"stop_live_data":"stop"}');
    childWindow2 = null;
  });

});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

// for video asset path (arg should be file name with extension)
ipcMain.on('path', async (event, arg) => {
  const msgTemplate = (arg: string) => `${arg}`;
  console.log(msgTemplate(arg));
    const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets',arg)
    : path.join(__dirname, '../renderer/assets',arg);
  event.reply('path', msgTemplate(`userData:- ${app.getPath('userData')} = main ${app.getPath('userData').split("\\")[2]} = ${serverPath}`));
});

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  // if (isDebug) {
  //   await installExtensions();
  // }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };
  
  mainWindow = new BrowserWindow({
    show: false,
    width: 1920,
    height: 1080,
    icon: getAssetPath('Ba_logo.png'),
    autoHideMenuBar: true,
    title: "ABHA",
    webPreferences: {
      // preload: app.isPackaged
      //   ? path.join(__dirname, 'preload.js')
      //   : path.join(__dirname, '../../.erb/dll/preload.js'),
        nodeIntegration:true,
        contextIsolation:false,
        webSecurity:false,
        devTools: true
    }
  });
  mainWindow.loadURL(resolveHtmlPath('index.html'));


  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });


  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  protocol.registerBufferProtocol('app', (request, callback) => {
    const url = request.url.substr(6); // Strip off 'app://'
    const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets','left-hand.mp4')
    : path.join(__dirname, '../../assets','left-hand.mp4');

    mainWindow?.webContents.send('paths',RESOURCES_PATH);
    // Read the file from the app.asar archive
    const file = fs.readFileSync(RESOURCES_PATH);

    // Return the file contents as a buffer
    callback({ mimeType: 'video/mp4', data: file });
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  if(child2!==null){
    // child2.stdin.pause();
    // child2.kill('SIGKILL');
    kill(child2.pid);
    console.log("window-all-closed");
  }
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    // Disable Electronmon file watching
    app.commandLine.appendSwitch('disable-features', 'Electronmon')
    createWindow();
    try{
        client.connect(PORT,HOST, function() { //'connect' listener
          console.log('client connected');
          // mainWindow?.webContents.send('client_status','connected');
        });
    }catch(e){
      console.log("Error connecting to Server:",e);
    }
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
