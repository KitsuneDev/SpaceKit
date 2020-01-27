
import {ipcMain} from 'electron'
import {app} from 'electron';
import {join} from 'path';
import {existsSync, rename} from 'fs'
import {promisify} from 'util';

var renameAsync = promisify(rename);
var rootName="Paradox Interactive/Stellaris"
var rootDir=join(app.getPath("documents"), rootName);

export default function HandleIPC(){

    ipcMain.handle('toggleModloader', async (event, arg) => {
        console.log(arg);
        if(arg == true) {
            await renameAsync(join(rootDir, "dlc_load.json"), join(rootDir, "dlc_load.json.userMods"))
        }
        else {
            await renameAsync(join(rootDir, "dlc_load.json.userMods"), join(rootDir, "dlc_load.json"))
        }
        return true
      })

      ipcMain.handle('queryModloader', function (event, arg) {
        var state = join(rootDir, "dlc_load.json.userMods") //TODO: Set correct filename
        return existsSync(state);
      })
}