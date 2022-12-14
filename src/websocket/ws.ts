import { DataHolder } from "../DataHolder";
import { WebSocketClient } from "./wsClient";

export abstract class WebSocketAPI{

    init(){}

    clients: WebSocketClient[];

    constructor() {
        this.clients = DataHolder.getData("wsClients");
        if (this.clients == null) this.clients = [];
    }

    connect(ws, req){
        const wsClient = new WebSocketClient(ws, req);
        this.clients.push(wsClient);
        DataHolder.setData("wsClients", this.clients);
        ws.on('close', ()=>{
            const name=this.clients.find(a=> a.getSessionID()===wsClient.getSessionID()).getSessionID();
            this.clients=this.clients.filter(a=> a!==wsClient);
            DataHolder.setData("wsClients", this.clients);
        });
        // console.log("c");
        ws.on('message', (msg)=>{
            // console.log("msg");
            wsClient.updateActivity();
            this.message(wsClient, req, msg);
        });
        this.connectFunc(wsClient, req);
    }

    keepAlive(){
        this.clients.forEach(client => {
            client.keepAlive();
        });
    }

    broadcast(data){
        this.clients.forEach(client => {
            client.dataSend(data);
        });
    }
    
    connectFunc(ws: WebSocketClient, req: Express.Request){}

    abstract message(ws: WebSocketClient, req: Express.Request, msg: string);
};