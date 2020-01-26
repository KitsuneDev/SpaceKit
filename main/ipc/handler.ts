
import {ipcMain} from 'electron'

export default function HandleIPC(){
    ipcMain.on('update-use-modMgr', function (event, arg) {
        console.log(arg);
      })
}