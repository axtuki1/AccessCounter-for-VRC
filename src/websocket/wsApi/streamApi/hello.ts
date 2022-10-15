import { WSRequestType } from "../../wsReqType";
import { WebSocketClient } from "../../wsClient";
import { DataHolder } from "../../../DataHolder";

export class hello extends WSRequestType{
    message(ws: WebSocketClient, req: Express.Request, data: object) {

        if( DataHolder.getData("isGettingTime") && DataHolder.getData("trainfo").length > 0){
            ws.send(JSON.stringify({
                type: "hello",
                trainfo: DataHolder.getData("trainfo")
            }));
        } else {
            ws.send(JSON.stringify({
                type: "hello",
                trainfo: "DISABLE"
            }));
        }
    }
};