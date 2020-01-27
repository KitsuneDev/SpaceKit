import {ipcRenderer} from 'electron'



export function ToggleModloader(status){
    return ipcRenderer.invoke("toggleModloader", status);
}