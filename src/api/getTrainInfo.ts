import { API } from "../api";
import { DataHolder } from "../DataHolder";
const config = require('config');

export class getTrainInfo extends API{
    public type: string = "get";
    public response = (req, res) => {
        res.json(DataHolder.getData("trainfo"));
    }

}