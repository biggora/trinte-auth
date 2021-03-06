/**
 *  TrinteJS Auth Module
 *
 *  @project     TrinteJS
 *  @version     0.0.4
 *  @package     trinte-auth
 *  @author      Aleksejs Gordejevs
 *  @created     2013-09-24 03:12:02
 *
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

/**
 * Library version.
 **/

exports.version = require('../package.json').version;

var defaults = {
    root: '/',
    login: '/login',
    register: '/register'
};


/**
 * AuthModule ensureLoggedIn
 *
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 *
 * @param {Object|String} options
 * @return {Function}
 * @api public
 */

function ensureLoggedIn(options) {
    var url = getRedirectTo( options, 'login' );
    var setReturnTo = (options.setReturnTo === undefined) ? true : options.setReturnTo;
    return function(req, res, next) {
        var auth = req.loggedIn || (req.isAuthenticated ? req.isAuthenticated() : false);
        if( !auth ) {
            if( setReturnTo && req.session ) {
                req.session.returnTo = req.originalUrl || req.url;
            }
            return res.redirect( url );
        }
        next();
    };
}

/**
 * AuthModule ensureLoggedOut
 *
 * Ensure that no user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that no user is logged in.  If a request is received
 * that is authenticated, the request will be redirected to another page (by
 * default to `/`).
 *
 * Options:
 *   - `redirectTo`   URL to redirect to in logged in, defaults to _/_
 *
 * Examples:
 *
 *     app.get('/login',
 *       ensureLoggedOut(),
 *       function(req, res) { ... });
 *
 *     app.get('/login',
 *       ensureLoggedOut('/home'),
 *       function(req, res) { ... });
 *
 *     app.get('/login',
 *       ensureLoggedOut({ redirectTo: '/home' }),
 *       function(req, res) { ... });
 *
 *
 * @param {Object|String} options
 * @return {Function}
 * @api public
 */

function ensureLoggedOut(options) {
    var url = getRedirectTo( options, 'root' );
    return function(req, res, next) {
        var auth = req.loggedIn || (req.isAuthenticated ? req.isAuthenticated() : false);
        if( auth ) {
            return res.redirect( url );
        }
        next();
    };
}

/**
 * AuthModule setReturnUrl
 *
 * @return {Function}
 * @api public
 */

function setReturnUrl() {
    return function(req, res, next) {
        if( req.session ) {
            req.session.returnTo = req.originalUrl || req.url;
        }
    };
}

/**
 * AuthModule logOut
 *
 * @param {Object|String} options
 * @return {Function}
 * @api public
 */
function logOut(options) {
    var url = getRedirectTo( options, 'root' );
    return function(req, res, next) {
        req.logout();
        res.redirect( url );
    };
}

/*
 * AuthModule getRedirectTo
 *
 * @param {Object|String} options
 * #param {String} page
 * @return {String}
 * @api public
 */
function getRedirectTo(options, page) {
    if( typeof options === 'string' ) {
        options = {redirectTo: options};
    }
    options = options || {};
    page = page || 'root';
    return options.redirectTo || defaults[page];
}

exports.setReturnUrl = setReturnUrl;
exports.logOut = logOut;

exports.ensureAuthenticated =
    exports.isLoggedIn =
        exports.ensureLoggedIn = ensureLoggedIn;

exports.ensureUnauthenticated =
    exports.ensureNotAuthenticated =
        exports.ensureLoggedOut =
            exports.isNotLoggedIn =
                exports.ensureNotLoggedIn = ensureLoggedOut;