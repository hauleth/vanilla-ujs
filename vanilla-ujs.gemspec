# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'vanilla/ujs/version'

Gem::Specification.new do |spec|
  spec.name          = 'vanilla-ujs'
  spec.version       = Vanilla::Ujs::VERSION
  spec.authors       = ["Łukasz Jan Niemier"]
  spec.email         = ['lukasz@niemier.pl']

  spec.summary       = 'Vanilla JS version of UJS'
  spec.description   = 'Vanilla JS version of UJS'
  spec.homepage      = 'https://github.com/hauleth/vanilla-ujs'
  spec.license       = 'MIT'

  # Prevent pushing this gem to RubyGems.org by setting 'allowed_push_host', or
  # delete this section to allow pushing this gem to any host.
  if spec.respond_to?(:metadata)
    spec.metadata['allowed_push_host'] = "TODO: Set to 'http://mygemserver.com'"
  else
    fail 'RubyGems 2.0 or newer is required to protect against public gem pushes.'
  end

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_dependency 'railties', '>= 4.2.0'

  spec.add_development_dependency 'bundler', '~> 1.11'
end
