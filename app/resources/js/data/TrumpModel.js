/* eslint-env browser */

import { DownloadWorker } from './DownloadWorker.js'

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

export default TrumpModel
