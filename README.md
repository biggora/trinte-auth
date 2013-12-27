# Auth module for TrinteJS Javascript MVC Framework

This middleware ensures that a user is logged in. If a request is received that is unauthenticated, the request will be redirected to a login page. The URL will be saved in the session, so the user can be conveniently returned to the page that was originally requested.

### Installation

    npm install trinte-auth

### Usage

In this example, an application has a profile page where preferences can be
configured.  A user must be logged in before accessing this page.

#### for trinte

manual setup in project `config/routes.js`

```js
    var auth = require('trinte-auth');

    // set before controller
    map.get('/profile', 'users#profile', auth.isLoggedIn('/login'));
    // or
    map.get('/profile',
      [auth.isLoggedIn('/login'),
      function(req, res) {
        res.render('profile', { user: req.user });
    }]);
```

#### for express

```js
    var auth = require('trinte-auth');

    app.get('/profile',
      auth.isLoggedIn('/login'),
      function(req, res) {
        res.render('profile', { user: req.user });
      });
```
      
If a user is not logged in when attempting to access this page, the request will
be redirected to `/login` and the original request URL (`/profile`) will be
saved to the session at `req.session.returnTo`.

### Copyright & License

    (The MIT License)

    Copyright (c) 2013 Alexey Gordeyev

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

### Resources

- Visit the [author website](http://www.gordejev.lv).
- Follow [@biggora](https://twitter.com/#!/biggora) on Twitter for updates.
- Follow [agbiggora](https://www.facebook.com/agbiggora) on Facebook for updates.
- Report issues on the [github issues](https://github.com/biggora/trinte-auth/issues) page.

### Recommend extensions

- [CaminteJS](http://www.camintejs.com/) - Cross-db ORM for NodeJS
- [2CO](https://github.com/biggora/2co) - is the module that will provide nodejs adapters for 2checkout API payment gateway.

