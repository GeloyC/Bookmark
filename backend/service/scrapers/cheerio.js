import axios from 'axios';
import * as cheerio from 'cheerio';

export const getFromCheerio = async (link) => {
    const { data }  = await axios.get(link, {
        timeout: 5000,
        headers: {
            "User-Agent": "Mozilla/5.0"
        }
    });

    const $ = cheerio.load(data);
    return $("title").text().trim();
}