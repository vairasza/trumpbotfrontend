/* eslint-env browser */

export const userTemplate = (message, person = 'user') => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	if (person === 'user') {
		newMessage.innerHTML = `
            <span class="message">
                <img class="avatar resize" src="resources/data/user.png" alt="user-avatar">
                <span class="name">You:</span>
                <p class="message-text">${message}</p>
            </span>`
	} else {
		newMessage.innerHTML = `
            <span class="message">
                <img class="avatar resize" src="resources/data/trump.png" alt="trump-avatar">
                <span class="name">Donald Trump:</span>
                <p class="message-text">${message}</p>
            </span>`
	}

	messages.appendChild(newMessage)
	messages.scrollTop = messages.scrollHeight
}

export const startTemplate = () => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	newMessage.innerHTML = `
    <span class="message">
        <img
            class="avatar resize"
            src="resources/data/trump.png"
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
            src="resources/data/trump.png"
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

export const errorMessageTemplate = () => {
	const newMessage = document.createElement('span')
	const messages = document.querySelector('.messages')

	newMessage.innerHTML = `
        <span class="message">
            <img class="avatar resize" src="resources/data/trump.png" alt="trump-avatar">
            <span class="name">Donald Trump:</span>
            <p class="message-text">'While the team tries to figure out what went wrong, try another topic...'</p>
        </span>`

	messages.appendChild(newMessage)
	messages.scrollTop = messages.scrollHeight
}
