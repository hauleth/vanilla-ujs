# Vanilla UJS

`Rails UJS` in pure JavaScript, with no `jQuery` dependency.

Based on [code of Łukasz Niemier](http://github.com/hauleth/vanilla-ujs).

## Should I use it?

Consider it if you do not need to support `IE<10` and have no other `jQuery` dependency in your front-end codebase.

Resources to make an educated guess:

- [jQuery's size](https://mathiasbynens.be/demo/jquery-size)
- [You might not need jQuery](http://youmightnotneedjquery.com/)
- [Browser usage](http://caniuse.com/usage-table)
- [Discussion in Rails-UJS issue tracker](https://github.com/rails/jquery-ujs/issues/447)

## Installation

As usual:

`Gemfile`
```ruby
gem 'vanilla-ujs'
```

Run `bundle` and have the asset pipeline pick it up:

`app/assets/javascripts/application.js`
```js
//= require vanilla-ujs
```

## Browser support

`vanilla-ujs` supports all [ever green browsers](http://stackoverflow.com/a/19060334/264514) (including IE10+).
