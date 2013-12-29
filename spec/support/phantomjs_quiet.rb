class Capybara::Poltergeist::Client
  private
  def redirect_stdout
    prev = STDOUT.dup
    prev.autoclose = false
    $stdout = @write_io
    STDOUT.reopen(@write_io)

    prev = STDERR.dup
    prev.autoclose = false
    $stderr = @write_io
    STDERR.reopen(@write_io)
    yield
  ensure
    STDOUT.reopen(prev)
    $stdout = STDOUT
    STDERR.reopen(prev)
    $stderr = STDERR
  end
end

class WarningSuppressor
  class << self
    def write(message)
      #puts "Write: #{message}"
      if message =~ /QFont::setPixelSize: Pixel size <= 0/ || message =~/CoreText performance note:/ then 0 else puts(message);1;end
    end
  end
end

Capybara.drivers.delete(:poltergeist)
Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, phantomjs_logger: WarningSuppressor)
end

Capybara.javascript_driver = :poltergeist