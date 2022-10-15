import { Library } from "../Library";

$(function () {

    let ws = null, users = {}, pushedUser = [], id = "";

    const deviceType = () => {
        const ua = navigator.userAgent;
        if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
            // スマートフォン
            return "mobile";
        } else if (ua.indexOf('iPad') > -1 || ua.indexOf('Android') > -1) {
            // タブレット
            return "tablet";
        } else {
            // PC
            return "pc";
        }
    }

    const update = () => {
        $(".users, .pushedUser").html("");
        Object.keys(users).forEach(Cid => {
            let name = users[Cid];
            if( id == Cid ){
                $(".users").append(`<div class="user">${name} [YOU]</div>`);
            } else {
                $(".users").append(`<div class="user">${name}</div>`);
            }
        });
        let rank = 1;
        pushedUser.forEach(Cid => {
            if (Object.keys(users).indexOf(Cid) == -1) {
                return;
            }
            let name = users[Cid];
            if( id == Cid ){
                $(".pushedUser").append(`<div class="user rank${rank}"><div class="rank">${rank}</div><div class="name">${name}</div>[YOU]</div>`);
            } else {
                $(".pushedUser").append(`<div class="user rank${rank}"><div class="rank">${rank}</div><div class="name">${name}</div></div>`);
            }
            rank++;
        });

    }

    const push = () => {
        if ($("input#username").val() == "") {
            Library.dialog(`お名前を教えて下さい`);
            return;
        }
        let dia = Library.dialog(`<n class="connecting-group">通信中<div class="loading-period-group"><span class="loading-period">.</span><span class="loading-period">.</span><span class="loading-period">.</span></div></div>`, {
            btn_ok_hidden: true,
            force_ok: true,
            icon: ""
        });
        setTimeout(() => {
            let domain = "";
            fetch("./api/v1/getWebSocketURL").then(res => res.json()).then((data) => {
                // console.log(data);
                domain = data.url;
                // console.log(domain);
                let url = "ws://" + domain;
                if (location.protocol == 'https:') {
                    url = "wss://" + domain
                }
                // console.log(location.protocol, location.protocol == 'https:');

                ws = new WebSocket(url);
                ws.addEventListener("message", e => {
                    const data = JSON.parse(e.data);
                    // console.log(data);
                    if (data.users != null) {
                        users = data.users;
                    }
                    if (data.pushedUser != null) {
                        pushedUser = data.pushedUser;
                    }
                    if( data.your_id != null ){
                        id = data.your_id;
                    }
                    if (data.mode == "reset") {
                        Library.dialog("リセットしました", {
                            autoClose: 500,
                            btn_ok_hidden: true,
                            force_ok: true,
                            icon: ""
                        });
                    }
                    update();
                });
                ws.addEventListener("open", e => {
                    ws.send(JSON.stringify({
                        mode: "hello",
                        name: $("input#username").val()
                    }));

                    dia.close();
                    $(".top-wrapper").hide();
                    $(".button-wrapper").show();
                });
                ws.addEventListener("close", e => {
                    Library.dialog("通信が切断されました。");
                });
            }).catch((e) => {
                console.log(e);
                dia.close();
                Library.dialog("通信に失敗しました。");
            });
        }, 250);
    }

    if( deviceType() == "mobile" || deviceType() == "tablet" ){
        $(".btn.join").on({
            "touchstart": push
        });
    } else {
        $(".btn.join").on({
            "click": push
        });
    }

    $(".main-button").on({
        "click": () => {
            ws.send(JSON.stringify({
                mode: "push"
            }));
        }
    });

});