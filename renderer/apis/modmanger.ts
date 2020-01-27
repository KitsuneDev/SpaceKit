import {ipcRenderer} from 'electron'



export function ToggleModloader(status){
    return ipcRenderer.invoke("toggleModloader", status);
}

export function QueryModloaderActive(){
    return ipcRenderer.invoke("queryModloader", status);
}