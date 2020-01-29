import { autoUpdater } from "electron-updater"
import {dialog} from 'electron'
import log from "electron-log"
export default class AppUpdater {
    constructor(isProd) {
      
      log.transports.file.level = (isProd == true) ? "debug" : "info"
      autoUpdater.logger = log
      autoUpdater.checkForUpdatesAndNotify()
      
    }
  }