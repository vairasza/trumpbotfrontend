/* eslint-env browser */

import TrumpModel from "./data/TrumpModel.js";

const messages = document.querySelector(".messages"),
    input = document.querySelector(".input"),
    button = document.querySelector(".button");

function init() {
    button.addEventListener("click", requestTweet);
    input.focus();
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            requestTweet();
        }
    });
    messages.addEventListener("received-new-tweet", addNewMessage);
    messages.addEventListener("error-input-request", displayErrorMessage);
}

function requestTweet() {
    if (input.value !== "") {
        button.disabled;
        TrumpModel.postUserMessage(input.value);
        TrumpModel.getNewTweet(input.value);
        input.value = "";
    }
}

function addNewMessage(event) {
    TrumpModel.postTrumpMessage(event.data.message);
    if (event.data.content !== null) {
        TrumpModel.postTrumpMessage(event.data.content);
    }
    button.enabled;
}

function displayErrorMessage() {
    //todo
}

//save user input to s3

init();