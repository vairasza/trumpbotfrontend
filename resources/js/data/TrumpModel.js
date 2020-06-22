/* eslint-env browser */

import Template from "../view/MessageTemplate.js";
import DownloadWorker from "./DownloadWorker.js";

class TrumpModel {

    constructor() {
        this.DownloadWorker = new DownloadWorker();
        this.DownloadWorker.addEventListener("received-new-tweet", this.addNewMessage);
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
        this.DownloadWorker.fetchAPI(user_input);
    }

    addNewMessage(event) {
        let inputObject = {
            imagefile: "trump",
            imagealt: "trump-avatar",
            namevalue: "Donald Trump:",
            messagetext: event.data.message,
        }
        Template(inputObject)
        
        if (event.data.content !== "") {
            let inputObject = {
                imagefile: "trump",
                imagealt: "trump-avatar",
                namevalue: "Donald Trump:",
                messagetext: event.data.content,
            }
            Template(inputObject)
        }
        
    }
}

export default new TrumpModel();