import { Library } from "../Library";

$(function(){
    
    $(".reset.btn").on({
        "click":()=>{
            fetch("./api/v1/resetPushData")
        }
    })

});