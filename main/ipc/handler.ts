
import {ipcMain} from 'electron'
import {app} from 'electron';
import {join} from 'path';
import {exists, rename, readFile, copyFile, readdir, writeFile} from 'fs'
import {promisify} from 'util';


var renameAsync = promisify(rename);
var readAsync = promisify(readFile);
var copyAsync = promisify(copyFile);
var existsAsync = promisify(exists);
var ls = promisify(readdir)
var writeFileAsync = promisify(writeFile)

var rootName="Paradox Interactive/Stellaris"
var rootDir=join(app.getPath("documents"), rootName);

export default function HandleIPC(){

    ipcMain.handle('toggleModloader', async (event, arg) => {
        console.log(arg);
        if(arg.status == true) {
            await renameAsync(join(rootDir, "dlc_load.json"), join(rootDir, "dlc_load.json.userMods"))
            if(await existsAsync(join(rootDir, "dlc_load.json.ml"))){
              await renameAsync(join(rootDir, "dlc_load.json.ml"), join(rootDir, "dlc_load.json"))
            }
        }
        else {
          if(await existsAsync(join(rootDir, "dlc_load.json"))){
            await renameAsync(join(rootDir, "dlc_load.json"), join(rootDir, "dlc_load.json.ml"))
          }
            await renameAsync(join(rootDir, "dlc_load.json.userMods"), join(rootDir, "dlc_load.json"))
            
        }
        return true
      })



      ipcMain.handle('queryModloader', async (event, arg) => {
        var state = join(rootDir, "dlc_load.json.userMods") //TODO: Set correct filename
        return await existsAsync(state);
      })
      ipcMain.handle('queryMods', async (event, arg) => {
        var state = join(rootDir, "mod") //TODO: Set correct filename
        return await ls(state);
      })
      //saveGameDlc
      ipcMain.handle('saveGameDlc', async (event, arg) => {
        var configStr = JSON.stringify(arg)
        var state = join(rootDir, "dlc_load.json") //TODO: Set correct filename
        console.log("Saving", configStr, state)
        return await writeFileAsync(state, configStr);
      })

      ipcMain.handle('readGameDlc', async (event, arg) => {
        const path = join(rootDir, "dlc_load.json");
        if(await existsAsync(path)){
        var file = await readAsync(path)
        return JSON.parse(file.toString())
        }
        else return {"disabled_dlcs":[],"enabled_mods":[]}
      })
}