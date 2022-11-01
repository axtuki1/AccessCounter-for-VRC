import { API } from "../api";
import { DataHolder } from "../DataHolder";
const config = require('config');

export class VRChatAccess extends API{
    
    public type: string = "get";
    public response = (req, res) => {
        const database_url = process.env.DATABASE_URL.replace("{IPADDR}", req.ip);
        fetch(database_url).then((e) => e.json()).then((json) => {
            if (json["data"]["value"] <= 1) {
                res.redirect(process.env.FIRST_ACCESS);
            } else {
                res.redirect(process.env.OTHER_ACCESS);
            }
        });
    }

}