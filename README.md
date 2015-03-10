# Vanilla UJS

It is implementation of Rails jQuery UJS in pure JavaScript. Based on [code of Łukasz Niemier](http://github.com/hauleth/vanilla-ujs).
No extra dependencies.

## Installation

_Vanilla UJS_ is meant to work as a Rails plugin. To install it in your current application, add the following to your `Gemfile`:

```ruby
gem 'vanilla-ujs'
```

The _Vanilla UJS_ files will be added to the asset pipeline and available for you to use. Just add these lines in `app/assets/javascripts/application.js`:

```js
//= require vanilla-ujs
```
