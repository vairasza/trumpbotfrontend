/* eslint-env browser */

import Template from "../view/MessageTemplate.js";
import DownloadWorker from "./DownloadWorker.js";

class TrumpModel {

    constructor() {
        this.DownloadWorker = new DownloadWorker();
    }

    postTrumpMessage(input) {
        let inputObject = {
            imagefile: "trump",
            imagealt: "trump-avatar",
            namevalue: "Donald Trump:",
            messagetext: input,
        }
        Template(inputObject)
    }

    postUserMessage(input) {
        let inputObject = {
            imagefile: "user",
            imagealt: "user-avatar",
            namevalue: "You:",
            messagetext: input,
        }
        Template(inputObject)
    }

    getNewTweet(user_input) {
        let input = {
            "user_input": user_input,
        }
        this.DownloadWorker.fetchAPI(JSON.stringify(input));
    }
}

export default new TrumpModel();