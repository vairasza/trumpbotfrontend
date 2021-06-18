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
