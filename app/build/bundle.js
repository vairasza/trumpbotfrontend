(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function fetchWithTimeout(url, options, timeout = 9000) {
	return Promise.race([
		fetch(url, options),
		new Promise((_, reject) =>
			setTimeout(() => reject(new Error('timeout')), timeout),
		),
	])
}

/**
 * Makes a request to the Lambda Functions that determine the answer from the trumpbot model
 * @param {object} user_input data transfered to lambda function to determine the trumpbots response
 * @param {boolean} api_version false for api version 1.0; true for api version 2.0
 * @return {Promise<object>} answer from the api; async
 */

const DownloadWorker = (user_input, api_version) => {
	return new Promise(async (resolve, reject) => {
		const api_url = api_version
			? 'https://4lph2mtf07.execute-api.eu-central-1.amazonaws.com/prod/trumpbot-alt'
			: 'https://mrq694isze.execute-api.eu-central-1.amazonaws.com/trumpbot_test/trumpbot'
		try {
			const response = await fetchWithTimeout(
				api_url,
				{
					method: 'POST',
					body: JSON.stringify(user_input),
					redirect: 'follow',
				},
				10000,
			)

			resolve(response.json())
		} catch (error) {
			reject(error.message)
		}
	})
}

module.exports = {
	DownloadWorker,
}

},{}],2:[function(require,module,exports){
const { DownloadWorker } = require('./DownloadWorker.js')

class TrumpModel {
	constructor() {
		this.init()
	}

	init() {
		this.newest_tweet = {
			flavor_text: '',
			last_tweet: '',
			fake_tweet: '',
		}
	}

	errorMessage() {
		this.newest_tweet.flavor_text =
			'While the team tries to figure out what went wrong, try another topic...'
		this.newest_tweet.last_tweet = ''
		this.newest_tweet.fake_tweet = 'exit'
	}

	async getDownloadResults(user_input, version = false) {
		const { flavor_text, last_tweet, fake_tweet } = await DownloadWorker(
			{
				user_input: user_input,
				last_tweet: this.newest_tweet.last_tweet,
				fake_tweet: this.newest_tweet.fake_tweet,
			},
			version,
		)

		this.newest_tweet.flavor_text = flavor_text
		this.newest_tweet.last_tweet = last_tweet
		this.newest_tweet.fake_tweet = fake_tweet

		return {
			flavor_text,
			last_tweet,
		}
	}
}

module.exports = {
	TrumpModel,
}

},{"./DownloadWorker.js":1}],3:[function(require,module,exports){
const { TrumpModel } = require('./data/TrumpModel.js')
const {
	errorMessageTemplate,
	userTemplate,
	startTemplate,
} = require('./view/messageTemplate.js')

const startButton = document.querySelector('.start-bot'),
	modal = document.querySelector('.modal'),
	input = document.querySelector('.input'),
	button = document.querySelector('.button.send-input'),
	help = document.querySelector('.help-button'),
	versionSwitch = document.querySelector('.trumpbot-version'),
	infobox = document.querySelector('.infobox')

const trumpModel = new TrumpModel()
let version = false

function init() {
	startTemplate()
	startButton.addEventListener('click', startBot)
}

function startBot() {
	modal.remove()

	document
		.querySelector('.switch-input')
		.addEventListener('change', switchVersion)
	help.addEventListener('click', getHelp)
	button.addEventListener('click', requestTweet)
	input.addEventListener('keyup', listenToKeyEnter)
	input.focus()
}

function switchVersion(event) {
	version = event.target.checked
	const messages = document.querySelector('.messages')
	messages.innerHTML = ''
	startTemplate()
	input.value = ''

	!version
		? (versionSwitch.innerHTML = '1.0')
		: (versionSwitch.innerHTML = '2.0')

	trumpModel.init()
	input.focus()
}

function listenToKeyEnter(event) {
	if (event.keyCode === 13) {
		requestTweet()
	}
}

function requestTweet() {
	if (input.value !== '') {
		button.removeEventListener('click', requestTweet)
		input.removeEventListener('keyup', listenToKeyEnter)
		input.disabled = true
		input.placeholder = 'No input possible while waiting for an answer...'

		userTemplate(input.value)
		addNewMessage(input.value, version)
		input.value = ''

		reattachEventListener()
	}
}

function reattachEventListener() {
	input.addEventListener('keyup', listenToKeyEnter)
	button.addEventListener('click', requestTweet)

	input.disabled = false
	input.placeholder = 'Type in a topic...'
	input.focus()
}

function getHelp() {
	infobox.classList.remove('hidden')
	button.removeEventListener('click', requestTweet)
	input.removeEventListener('keyup', listenToKeyEnter)
	input.disabled = true
	document.querySelector('.resume-bot').addEventListener('click', removeHelper)
}

function removeHelper() {
	infobox.classList.add('hidden')
	reattachEventListener()
}

async function addNewMessage(user_input, version) {
	const { last_tweet, flavor_text } = await trumpModel.getDownloadResults(
		user_input,
		version,
	)

	if (last_tweet === 'error') {
		trumpModel.errorMessage()
		errorMessageTemplate()
	} else {
		const message = last_tweet !== '' ? last_tweet : flavor_text
		userTemplate(message, 'trump')
	}
}

init()

},{"./data/TrumpModel.js":2,"./view/messageTemplate.js":4}],4:[function(require,module,exports){
const userTemplate = (message, person = 'user') => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	if (person === 'user') {
		newMessage.innerHTML = `
            <span class="message">
                <img class="avatar resize" src="./app/data/user.png" alt="user-avatar">
                <span class="name">You:</span>
                <p class="message-text">${message}</p>
            </span>`
	} else {
		newMessage.innerHTML = `
            <span class="message">
                <img class="avatar resize" src="./app/data/trump.png" alt="trump-avatar">
                <span class="name">Donald Trump:</span>
                <p class="message-text">${message}</p>
            </span>`
	}

	messages.appendChild(newMessage)
	messages.scrollTop = messages.scrollHeight
}

const startTemplate = () => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	newMessage.innerHTML = `
    <span class="message">
        <img
            class="avatar resize"
            src="./app/data/trump.png"
            alt="trump_avatar"
        />
        <span class="name">Donald Trump:</span>
        <p class="message-text">
            Welcome to the Donald Trump Tweet Generation Bot!
        </p>
    </span>

    <span class="message">
        <img
            class="avatar resize"
            src="./app/data/trump.png"
            alt="trump_avatar"
        />
        <span class="name">Donald Trump:</span>
        <p class="message-text">
            Many are saying I'm the best 140 character writer in the world. Just
            give me a topic and will tweet the hell out of it!
        </p>
    </span>`

	messages.appendChild(newMessage)
	messages.scrollTop = messages.scrollHeight
}

const errorMessageTemplate = () => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	newMessage.innerHTML = `
        <span class="message">
            <img class="avatar resize" src="./app/data/trump.png" alt="trump-avatar">
            <span class="name">Donald Trump:</span>
            <p class="message-text">'While the team tries to figure out what went wrong, try another topic...'</p>
        </span>`

	messages.appendChild(newMessage)
	messages.scrollTop = messages.scrollHeight
}

module.exports = {
	userTemplate,
	startTemplate,
	errorMessageTemplate,
}

},{}]},{},[3]);
