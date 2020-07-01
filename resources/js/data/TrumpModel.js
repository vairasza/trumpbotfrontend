/* eslint-env browser */

import Template from "../view/MessageTemplate.js";
import DownloadWorker from "./DownloadWorker.js";
import { Event, Observable } from "../utils/Observable.js";

class TrumpModel extends Observable{

    constructor() {
        super();
        this.newest_tweet = {
            flavor_text: "",
            last_tweet: "",
            fake_tweet: ""
        };
        
        this.DownloadWorker = new DownloadWorker();
        this.DownloadWorker.addEventListener("received-new-tweet", this.addNewMessage.bind(this));
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

    getNewestTweet() {
        return this.newest_tweet;
    }

    addNewMessage(event) {
        
        this.newest_tweet.flavor_text = event.data.flavor_text;
        this.newest_tweet.last_tweet = event.data.last_tweet;
        this.newest_tweet.fake_tweet = event.data.fake_tweet;

        let inputObject = {
            imagefile: "trump",
            imagealt: "trump-avatar",
            namevalue: "Donald Trump:",
            messagetext: event.data.flavor_text,
        }
        Template(inputObject)
        
        if (event.data.last_tweet !== "") {
            let inputObject = {
                imagefile: "trump",
                imagealt: "trump-avatar",
                namevalue: "Donald Trump:",
                messagetext: event.data.last_tweet,
            }
            Template(inputObject)
        }

        this.notifyAll(new Event("added-new-text"));
        
    }
}

export default TrumpModel;