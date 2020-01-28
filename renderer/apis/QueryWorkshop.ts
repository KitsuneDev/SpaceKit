import axios from 'axios';
import qs from 'qs';

export interface Tag {
    tag: string;
}

export interface PublishedFileDetail {
    publishedfileid: string;
    result: number;
    creator: string;
    creator_app_id: number;
    consumer_app_id: number;
    filename: string;
    file_size: number;
    file_url: string;
    hcontent_file: string;
    preview_url: string;
    hcontent_preview: string;
    title: string;
    description: string;
    time_created: number;
    time_updated: number;
    visibility: number;
    banned: number;
    ban_reason: string;
    subscriptions: number;
    favorited: number;
    lifetime_subscriptions: number;
    lifetime_favorited: number;
    views: number;
    tags: Tag[];
}

export interface Response {
    result: number;
    resultcount: number;
    publishedfiledetails: PublishedFileDetail[];
}

export interface QueryResponseObject {
    response: Response;
}

export async function QueryWorkshop(items: string[]){

    var base = {
        "itemcount": items.length
    }
    for(var i=0; i<items.length; i++) {
        base[`publishedfileids[${i}]`] = items[i]
    }
    if(base["publishedfileids[0]"] == null) return {response: {
        publishedfiledetails: []
    }};
    //"publishedfileids": items
    var query = await axios({
        method: 'post',
        url: 'https://api.steampowered.com/ISteamRemoteStorage/GetPublishedFileDetails/v1/',
        data: qs.stringify(base),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
    
    return query.data as QueryResponseObject;
}