# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'vanilla/ujs/version'

Gem::Specification.new do |spec|
  spec.name          = 'vanilla-ujs'
  spec.version       = Vanilla::Ujs::VERSION
  spec.authors       = ['Łukasz Jan Niemier', 'Alex Tsukurov', 'Kirill Pimenov']
  spec.email         = ['lukasz@niemier.pl', 'me@ximik.net']

  spec.summary       = 'UJS without jQuery dependency'
  spec.description   = 'This gem provides Rails UJS features without jQuery library.'
  spec.homepage      = 'https://github.com/hauleth/vanilla-ujs'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test)/}) }
  spec.require_paths = ['lib']

  spec.required_rubygems_version = '>= 1.3.6'

  spec.add_development_dependency 'railties', '>= 4.2.0'
  spec.add_development_dependency 'bundler', '~> 1.11'
end
