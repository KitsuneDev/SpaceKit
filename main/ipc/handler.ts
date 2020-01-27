
import {ipcMain} from 'electron'

export default function HandleIPC(){
    ipcMain.handle('toggleModloader', function (event, arg) {
        console.log(arg);
        return true
      })
}