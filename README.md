# Vanilla UJS
[![Build Status][travis-img]][travis-link][![Bower version](https://badge.fury.io/bo/vanilla-ujs.png)](http://badge.fury.io/bo/vanilla-ujs)[![Dependency Status](https://gemnasium.com/hauleth/vanilla-ujs.png)](https://gemnasium.com/hauleth/vanilla-ujs)

It is implementation of Rails [jQuery UJS][jq-ujs] in pure JavaScript.
No extra dependencies.

## Installation using the vanilla-ujs gem

For automated installation in Rails, use the "vanilla-ujs" gem. Place this in your Gemfile:

```ruby
gem 'vanilla-ujs', github: 'hauleth/vanilla-ujs'
```

And run:

```shell
$ bundle install
```

Require `vanilla-ujs` into your application.js manifest.

```javascript
//= require vanilla-ujs
```

## Does it mean that I shouldn't use jQuery

No. You should if you want. This library is created to make your Rails code
independent from front-end library.

## Contribute

1. Clone repo

        $ git clone git://github.com/hauleth/vanilla-js.git
        $ cd vanilla-js/

2. Install dependencies

        $ npm install

3. Run tests

        $ grunt test

## Thanks

- Walter Lee Davis ([@walterdavis](https://github.com/walterdavis))
- Tasveer Singh ([@tazsingh](https://github.com/tazsingh))
- Tim O'Sulg ([@timgluz](https://github.com/timgluz))
- Matt Huggins ([@mhuggins](https://github.com/mhuggins))
- Alex Tsokurov ([@ximik](https://github.com/ximik))

# License

See [LICENSE](LICENSE) file.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/hauleth/vanilla-ujs/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

[travis-img]:  https://travis-ci.org/hauleth/vanilla-ujs.png?branch=master
[travis-link]: https://travis-ci.org/hauleth/vanilla-ujs
[jq-ujs]:      https://github.com/rails/jquery-ujs
[bower]:       https://bower.io/
