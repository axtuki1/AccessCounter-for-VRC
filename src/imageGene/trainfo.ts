import { webScraping } from "./webScraping";

export class Trainfo extends webScraping{
    constructor(url:string){
        super(url);
    }

    async scraping(){
        let out;
        return super.scraping().then(($)=>{
            let t = $('dd.trouble p').text(), isTrouble = true;
            if( t == "" ){
                isTrouble = false;
                t = $('dd.normal p').text();
            }
            out = {
                text: t,
                isTrouble: isTrouble
            };
            return out;
        });
    }
}