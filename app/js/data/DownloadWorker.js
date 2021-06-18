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
