import {ipcRenderer} from 'electron'
import { QueryResponseObject } from './QueryWorkshop';
import { DlcLoad } from '../../main/ipc/modMgr/gameFiles';

export interface ToggleRequest {
    status: boolean,
    managerState: DlcLoad
}

export default class ModManager{
static ToggleModloader(status: DlcLoad):Promise<void>{
    return ipcRenderer.invoke("toggleModloader", status);
}

static QueryModloaderActive(): Promise<boolean>{
    return ipcRenderer.invoke("queryModloader");
}

static GetDLCLoads(): Promise<QueryResponseObject>{
    return ipcRenderer.invoke("readGameDlc");
}
static GetMods(): Promise<string[]> {
    return ipcRenderer.invoke("queryMods");
}
}