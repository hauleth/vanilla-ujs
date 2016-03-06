# Vanilla UJS
[![Build Status][travis-img]][travis-link][![Dependency Status](https://gemnasium.com/hauleth/vanilla-ujs.png)](https://gemnasium.com/hauleth/vanilla-ujs)

It is implementation of Rails [jQuery UJS][jq-ujs] in pure JavaScript.
No extra dependencies.

## Installation using the vanilla-ujs gem

For automated installation in Rails, use the `vanilla-ujs` gem.
Place this in your Gemfile:

```ruby
gem 'vanilla-ujs'
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

- Alex Tsokurov ([@ximik](https://github.com/ximik))
- Matt Huggins ([@mhuggins](https://github.com/mhuggins))
- Tasveer Singh ([@tazsingh](https://github.com/tazsingh))
- Tim O'Sulg ([@timgluz](https://github.com/timgluz))
- Walter Lee Davis ([@walterdavis](https://github.com/walterdavis))

# License

See [`LICENSE`](LICENSE.txt) file.

[travis-img]:  https://travis-ci.org/hauleth/vanilla-ujs.png?branch=master
[travis-link]: https://travis-ci.org/hauleth/vanilla-ujs
[jq-ujs]:      https://github.com/rails/jquery-ujs
