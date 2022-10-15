import { WebSocketClient } from "./wsClient";

export abstract class WSRequestType{

    abstract message(ws: WebSocketClient, req: Express.Request, data: object);
    
};