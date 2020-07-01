/* eslint-env browser */

import { Event, Observable } from "../utils/Observable.js";

class DownloadWorker extends Observable{
    
    constructor() {
        super();
    }

    fetchAPI(user_input) {  
        fetch("https://mrq694isze.execute-api.eu-central-1.amazonaws.com/trumpbot_test/trumpbot",
        {
            method: 'POST',
            body: JSON.stringify(user_input),
            redirect: 'follow',
        })
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