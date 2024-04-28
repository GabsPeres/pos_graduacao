export class Reddit {
    static async get(tag) {
        try {
            const response = await fetch(`https://reddit.com/r/${tag}.json`);
            const responseJson = await response.json();
            return responseJson.data.children;
        } catch (e) {
            throw e;
        }
    }
}    