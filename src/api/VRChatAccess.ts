import { API } from "../api";
import { DataHolder } from "../DataHolder";
const config = require('config');

export class VRChatAccess extends API{
    
    // https://script.google.com/macros/s/AKfycbx6eB3LO9YAPB2SKjJqyRHY1qOXMCt9LzkAKdMScFwz-j_kfgJP0zrYpyH0DcR5T0hHoQ/exec?mode=add&ipaddress=0.0.0.2

    public type: string = "get";
    public response = (req, res) => {
        const red_youtube = "https://youtu.be/euF_589aIK8";
        const blue_youtube = "https://youtu.be/8PaLHP51XqQ";
        const database_url = "https://script.google.com/macros/s/AKfycbx6eB3LO9YAPB2SKjJqyRHY1qOXMCt9LzkAKdMScFwz-j_kfgJP0zrYpyH0DcR5T0hHoQ/exec?mode=add&ipaddress="+req.ip;
        fetch(database_url).then((e) => e.json()).then((json) => {
            if (json.data.value > 1) {
                res.redirect(red_youtube);
            } else {
                res.redirect(blue_youtube);
            }
        });
    }

}