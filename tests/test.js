/**
 *  TrinteJS Auth Module
 *
 *  @project     TrinteJS
 *  @version     0.0.1
 *  @package     trinte-auth
 *  @author      Aleksejs Gordejevs
 *  @created     2013-09-24 03:12:02
 * 
 *  Created by init script
 *  App based on TrinteJS MVC framework
 *  TrinteJS homepage http://www.trintejs.com
 **/

var trinteAuth = require('./../lib/trinte-auth.js');

exports['should export isLoggedIn'] = function(test) {
    test.equal(typeof trinteAuth.isLoggedIn, 'function');
    test.strictEqual(trinteAuth.isLoggedIn, trinteAuth.ensureAuthenticated);
    test.strictEqual(trinteAuth.isLoggedIn, trinteAuth.ensureLoggedIn);
    test.done();
};

exports['should export isNotLoggedIn'] = function(test) {
    test.equal(typeof trinteAuth.isNotLoggedIn, 'function');
    test.strictEqual(trinteAuth.isNotLoggedIn, trinteAuth.ensureNotLoggedIn);
    test.strictEqual(trinteAuth.isNotLoggedIn, trinteAuth.ensureUnauthenticated);
    test.strictEqual(trinteAuth.isNotLoggedIn, trinteAuth.ensureNotAuthenticated);
    test.done();
};

exports['should export logOut'] = function(test) {
    test.equal(typeof trinteAuth.logOut, 'function');
    test.equal(typeof trinteAuth.logOut(), 'function');
    test.done();
};

exports['should export setReturnUrl'] = function(test) {
    test.equal(typeof trinteAuth.setReturnUrl, 'function');
    test.equal(typeof trinteAuth.setReturnUrl(), 'function');
    test.done();
};    