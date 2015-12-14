# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name        = "vanilla-ujs"
  s.version     = "1.0.0"
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Alex Tsokurov", "Łukasz Niemier", "Kirill Pimenov"]
  s.email       = ["me@ximik.net"]
  s.homepage    = "https://github.com/Ximik/vanilla-ujs"
  s.summary     = "UJS without jQuery dependency"
  s.description = "This gem provides Rails UJS features without jQuery library."
  s.license     = "MIT"

  s.required_rubygems_version = ">= 1.3.6"

  s.files        = `git ls-files`.split("\n")
  s.require_path = 'lib'
end
