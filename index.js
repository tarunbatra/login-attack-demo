var dictionary = require('./dictionary');

var user = {};  // Valid user for this instance
// Randomely choose username and password from dictionary.
user.username = dictionary[_getRandomNumber(0, dictionary.length)];
user.password = dictionary[_getRandomNumber(0, dictionary.length)];

console.log('Random user generated:', user);

/**
 * A server which doesn't give hints
 * about the reason of login failure
 * @param {string} username
 * @param {string} password
 */
function smartServer(username, password) {
    if (user.username === username && user.password === password) {
        return { success: true };
    } else {
        return { success: false, reason: 'Invalid login credentials' };
    }
};
/**
 * A server which gives hints
 * about the reason of login failure
 * @param {string} username
 * @param {string} password
 */
function naiveServer(username, password) {
    if (user.username !== username) {
        return { success: false, reason: 'Invalid username' };
    } else if (user.password !== password) {
        return { success: false, reason: 'Invalid password' };
    } else {
        return { success: true };
    }
}

/**
 * Generates random number from min to max-1
 * @param {number} min
 * @param {number} max
 */
function _getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Attacks the server for
 * login using dictionary
 * @param {function} server
 */
function attack(server) {
    var done = false;
    var i = 0;
    var j = 0;
    var tries = 0;
    while(!done) {
        var username = dictionary[i];                           // Choose a username
        var password = dictionary[j];                           // Choose a password
        var response = server(username, password);              // Hit the server
        tries++;                                                // Increment the tries
        if (response.success) {                                 // If login succeeds
            done = true;                                        // then exit
        }
        else if (response.reason === 'Invalid username') {      // If username is invalid
            i++;                                                // then select next username
        }
        else if (response.reason === 'Invalid password') {      // If password is invalid
            j++;                                                // then select next password
        }
        else {                                                  // If none of them
            j++;                                                // then move to next password
            if (j === dictionary.length) {                      // If all passwords have been exhausted
                i++;                                            // then move to next username
                j=0;                                            // and start from the first password
            }
        }
    }
    return tries;
}

console.time('Time to crack (smart)');
var smartServerTries = attack(smartServer);
console.timeEnd('Time to crack (smart)');
console.time('Time to crack (naive)');
var naiveServerTries = attack(naiveServer);
console.timeEnd('Time to crack (naive)');
console.log('TRIES (smart):', smartServerTries);
console.log('TRIES (naive):', naiveServerTries);
