import DefaultValidators from "./DefaultValidators.js";

export default class Tools {

    static WhichGroupHasFound(groups) {
        for (const groupName in groups) {
            if (!DefaultValidators.IsUndefined(groups[groupName])) {
                return groupName;
            }
        }
    };
}

export class CookieController {
    static parseCookies() {
    const cookieString = document.cookie;
    const cookies = {};
    
    if (cookieString) {
        cookieString.split("; ").forEach(pair => {
            const [key, value] = pair.split("=");
            cookies[key] = decodeURIComponent(value);
        });
    }

    return cookies;
    }

    static addCookie(key, json_value) {
        document.cookie = key+ "=" + encodeURIComponent(JSON.stringify(json_value)) + "; max-age=86400; path=/";
    }

    static deleteCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }

    static deleteAllCookies(){

        let coock = Object.keys(parseCookies());
    
        for (const cookie of coock) {
            deleteCookie(cookie);
        }
    }

}

