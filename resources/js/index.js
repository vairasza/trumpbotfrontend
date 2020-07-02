/* eslint-env browser */

import TrumpModel from "./data/TrumpModel.js";

const messages = document.querySelector(".messages"),
    input = document.querySelector(".input"),
    button = document.querySelector(".button");

const trumpModel = new TrumpModel();

function init() {
    button.addEventListener("click", requestTweet);
    input.addEventListener("keyup", listenToKeyEnter);
    input.focus();
    trumpModel.addEventListener("added-new-text", reattachEventListener);
}

function listenToKeyEnter(event) {
    if (event.keyCode === 13) {
        requestTweet();
    }
}

function requestTweet() {
    if (input.value !== "") {
        button.removeEventListener("click", requestTweet);
        input.removeEventListener("keyup", listenToKeyEnter);
        input.disabled = true;
        input.placeholder = "No input possible while waiting for an answer...";

        let tweet = trumpModel.getNewestTweet();

        let request = {
            "user_input": input.value,
            "last_tweet": tweet.last_tweet,
            "fake_tweet": tweet.fake_tweet
        };

        trumpModel.postUserMessage(input.value);
        trumpModel.getNewTweet(request);
        input.value = "";
    }
}

function reattachEventListener() {
    input.addEventListener("keyup", listenToKeyEnter);
    button.addEventListener("click", requestTweet);

    input.disabled = false;
    input.placeholder = "Type in a topic...";
    input.focus();
}

init();