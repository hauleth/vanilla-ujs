module VanillaUjs
  module Rails
    class Engine < ::Rails::Engine
      initializer "configure assets of vanilla-ujs", :group => :all do |app|
        app.config.assets.precompile += %w( vanilla-ujs.js )
      end
    end
  end
end