/* eslint-disable no-console */
const handler = require('../scripts/handler');

try {
	const result = handler.findPath('ALPHA', 'CHARLIE');
	console.log(result);
} catch (error) {
	console.log(error);
}
