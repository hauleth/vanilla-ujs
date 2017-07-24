module Vanilla
  module Ujs
    require 'vanilla/ujs/version'

    if defined?(Rails)
      require 'vanilla/ujs/rails'
    end
  end
end
