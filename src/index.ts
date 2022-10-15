import { API } from "./api";
import { DataHolder } from "./DataHolder";
import { WebSocketAPI } from "./websocket/ws";
import { Trainfo } from "./imageGene/trainfo";

const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const config = require('config');
const fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || config.serverPort || 3000;
const package_json = require('../package.json');
const isProxy = Boolean(process.env.IS_PROXY) || config.useProxy || false;
const DEBUG = process.env.DEBUG || true;
const isAllTimeGet = process.env.AllTIMEGET || false;

app.set('trust proxy', isProxy);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('dist'));

if (package_json.name == "template") {
    process.exit(1);
}

console.log("///////////////////////////////////////////////");
console.log("     " + package_json.name + " v" + package_json.version);
console.log("///////////////////////////////////////////////");

const init = () => {

    
}
init();

const router = express.Router();

console.log("Loading webAPI module....");

fs.readdir('./build/api', function (err, files) {
    if (err) throw err;
    files.forEach(element => {
        let name = element.slice(0, -3);
        import('./api/' + name).then((module) => {
            const api: API = new module[name]();
            console.log("[WEBAPI] " + name + " is loaded. endpoint: /api/v1/" + name);
            let endpoint = "/api/v1/" + name;
            if (api.type == "post") {
                router.post(endpoint, (req, res) => {
                    return api.response(req, res);
                });
            } else {
                router.get(endpoint, (req, res) => {
                    return api.response(req, res);
                });
            }
        }).catch((e) => {
            console.log("[" + name + "] " + e);
        });;
    });
});

app.use(router);

console.log("Loading websocket module....");

const wsApi: { [key: string]: WebSocketAPI } = {};

fs.readdir('./build/websocket/wsApi', function (err, files) {
    if (err) throw err;
    files.forEach(element => {
        fs.stat('./build/websocket/wsApi/' + element, (err, stats) => {
            if (err) {
                console.error(err);
                return;
            }
            if (!stats.isDirectory()) {
                let name: string = element.slice(0, -3);
                import('./websocket/wsApi/' + name).then((module) => {
                    const api: WebSocketAPI = new module[name]();
                    wsApi[name] = api;
                    api.init();
                    app.ws('/' + name, (ws, req) => {
                        api.connect(ws, req);
                    });
                    console.log("[WSAPI] " + name + " is loaded. ");
                }).catch((e) => {
                    console.log(e);
                });
            }
        });

    });
});

setInterval(() => {
    Object.keys(wsApi).forEach(key => {
        wsApi[key].keepAlive();
    });
}, 20 * 1000);


app.listen(port, function () {
    console.log("listening to PORT: " + port);
});

