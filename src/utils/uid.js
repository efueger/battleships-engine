/**
 * Returns a unique id. This id is a number (starting from 1) which will never get repeated on successive calls
 * to this method.
 *
 * @function
 * @memberOf utils
 * @returns {Number} A number representing the id.
 */
export default ( () => {
	let next = 1;

	return () => {
		return next++;
	};
} )();