/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

class DownloadWorker extends Observable{
    
    constructor() {
        super();
    }

    fetchAPI(user_input) {
        let headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("Content-Length", user_input.length);
        headers.append("Accept", "application/json");
        headers.append("x-api-key", "DB8j6GT18x6jelaCxbw4w9pmnB9VOL9I2CHg0x7y"); //save somewhere else

        fetch("https://mrq694isze.execute-api.eu-central-1.amazonaws.com/trumpbot_test/trumpbot", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(user_input),
        })
        .then(response => response.json())
        .then(data => {
            let event = new Event("received-new-tweet");
            this.notifyAll(event, data);
        })
        .catch(error => {
            let event = new Event("error-input-request");
            this.notifyAll(event, error);
        });
    }
}

export default DownloadWorker;