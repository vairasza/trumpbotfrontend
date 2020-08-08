/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

function fetchWithTimeout(url, options, timeout = 7000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

class DownloadWorker extends Observable{
    
    constructor() {
        super();
    }

    fetchAPI(user_input) {
        fetchWithTimeout("https://mrq694isze.execute-api.eu-central-1.amazonaws.com/trumpbot_test/trumpbot",
        {
            method: 'POST',
            body: JSON.stringify(user_input),
            redirect: 'follow',
        }, 10000)
        .then(response => response.json())
        .then(data => {
            let event = new Event("received-new-tweet", data);
            this.notifyAll(event);
        })
        .catch(error => {
            let event = new Event("error-input-request", error);
            this.notifyAll(event);
        });
    }
}

export default DownloadWorker;