import { DataHolder } from "../../DataHolder";
import { WSRequest } from "../wsReq";

export class streaming extends WSRequest {
    getAPIDirectory() {
        return "streamApi";
    }
}