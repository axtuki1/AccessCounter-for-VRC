const rp = require('request-promise');
const cheerio = require('cheerio');
const options = {
    transform: (body) => {
        return cheerio.load(body);
    }
};
export class webScraping {

    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    getURL(){
        return this.url;
    }

    scraping(): Promise<any>{
        return rp.get(this.url, options);
    }

}