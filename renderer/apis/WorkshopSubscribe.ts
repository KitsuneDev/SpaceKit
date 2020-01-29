import * as electron from 'electron'
import axios from  'axios';
import qs from 'qs';
//import * as remote from 'electron';
var remote = electron.remote ?? electron

const {BrowserWindow} = remote;

export default class SteamWorkshopSubscriber {
    sessionCookies: electron.Cookie[];
    async subscribe(id){
        if(this.sessionCookies == null){
            this.sessionCookies = await this.createSession()
        }
        return await (await this.subQuery(id)).data.success;

    }

    async subQuery(id){
        var base = {
            id: id,
            appid: 281990,
            sessionid: this.sessionCookies.find((i)=>i.name=="sessionid").value
        }
        return await axios({
            method: 'post',
            url: 'https://steamcommunity.com/sharedfiles/subscribe',
            data: qs.stringify(base),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              'Cookies': `sessionid=${this.sessionCookies.find((i)=>i.name=="sessionid").value}; steamLoginSecure=${this.sessionCookies.find((i)=>i.name=="steamLoginSecure").value}`
            }
          })
    }
    
    createSession(): Promise<electron.Cookie[]>{
        return new Promise((resolve, reject)=>{
            let win = new BrowserWindow({ width: 800, height: 600 })
            win.on('closed', () => {
                win = null
            })
            win.setTitle("Steam Private API Access")
            win.on('page-title-updated', (event)=>event.preventDefault())
            win.webContents.on('page-title-updated', (event)=>event.preventDefault())
            // Load a remote URL
            win.loadURL('https://steamcommunity.com/login/home/?goto=')
            
            win.webContents.on('did-navigate', async (event, url, httpResponseCode, httpStatusText)=>{
                console.log("NavigURL", url)
                if(url=="https://steamcommunity.com" || url.includes("https://steamcommunity.com/id/")){
                    var cookies = await win.webContents.session.cookies.get({
                        domain: "steamcommunity.com"
                    })
                    console.log("We are in.", cookies)
                    win.close()
                    resolve(cookies)
            }
        })
    });
}
}