export class Library {
    static dialog(content, options = {})  {
        const dialog_options = Object.assign({
            force_ok: false,
            btn_ok_hidden: false,
            autoClose: 0,
            theme: "",
            icon: '<i class="fa fa-info-circle" aria-hidden="true"></i>',
            closeFunc: (e)=>{}
        }, options);
        let dom = $("<div></div>").addClass("dialog-wrapper");
        const dialog_close = (e = {}) => {
            dom.addClass("closing");
            dialog_options.closeFunc(e);
            setTimeout(()=>{
                dom.remove();
            },2000);
        }
        let tmp = $("<div></div>").append(
            $("<div></div>").addClass("icon").html(dialog_options.icon)
        ).append(
            $("<div></div>").addClass("txt").html(content)
        ).addClass("dialog").addClass(dialog_options.theme).on({"click":(e)=>{e.stopPropagation()}});
        if(!dialog_options.btn_ok_hidden){
            tmp.append(
                $("<div></div>").addClass("button").html("OK").on({
                    "click" : dialog_close
                })
            )
        }
        dom.append(tmp);
        if(!dialog_options.force_ok){
            dom.on({
                "click" : dialog_close
            });
        }
        if( dialog_options.autoClose > 0 ){
            setTimeout(dialog_close, dialog_options.autoClose);
        }
        $("body").append(dom);
        setTimeout(()=>{
            dom.addClass("show")
        },10);
        return {
            close: dialog_close,
            dom: dom
        };
    }

    static floor(base, ext){
        return Math.floor(base * (10 ^ ext)) / (10 ^ ext);
    }
}