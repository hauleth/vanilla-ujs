# Rails template to build the sample app for specs

run "rm Gemfile"
run "rm -r test"
#run "rm -r spec"

#copy_file File.expand_path('../templates/cucumber.rb', __FILE__), "config/environments/cucumber.rb"

gsub_file 'config/database.yml', /^test:.*\n/, "test: &test\n"

generate :model, "post title:string body:text published_at:datetime"
run "rm -r spec"
run "rm -r app"
run "ln -s #{File.dirname(File.expand_path(__FILE__))}/templates/app #{ENV['RAILS_ROOT']}"

route "root 'posts#index'"

inject_into_file "config/environment.rb", %{
  $LOAD_PATH.unshift('#{File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'lib'))}')
  require "vanilla-ujs"
}, :after => "require File.expand_path('../application', __FILE__)"

=begin
generate :model, "post title:string body:text published_at:datetime author_id:integer category_id:integer starred:boolean"
inject_into_file 'app/models/post.rb', %q{
  belongs_to :category
  belongs_to :author, :class_name => 'User'
  has_many :taggings
  accepts_nested_attributes_for :author
  accepts_nested_attributes_for :taggings
  attr_accessible :author unless Rails::VERSION::MAJOR > 3 && !defined? ProtectedAttributes
}, :after => 'class Post < ActiveRecord::Base'
copy_file File.expand_path('../templates/post_decorator.rb', __FILE__), "app/models/post_decorator.rb"

generate :model, "user type:string first_name:string last_name:string username:string age:integer"
inject_into_file 'app/models/user.rb', %q{
  has_many :posts, :foreign_key => 'author_id'
  def display_name
    "#{first_name} #{last_name}"
  end
}, :after => 'class User < ActiveRecord::Base'

generate :model, 'publisher --migration=false --parent=User'
generate :model, 'category name:string description:text'
inject_into_file 'app/models/category.rb', %q{
  has_many :posts
  has_many :authors, through: :posts
  accepts_nested_attributes_for :posts
}, :after => 'class Category < ActiveRecord::Base'
generate :model, 'store name:string'

# Generate a model with string ids
generate :model, "tag name:string"
gsub_file(Dir['db/migrate/*_create_tags.rb'][0], /\:tags\sdo\s.*/, ":tags, :id => false, :primary_key => :id do |t|\n\t\t\tt.string :id\n")
inject_into_file 'app/models/tag.rb', %q{
  self.primary_key = :id
  before_create :set_id

  private
  def set_id
    self.id = 8.times.inject("") { |s,e| s << (i = Kernel.rand(62); i += ((i < 10) ? 48 : ((i < 36) ? 55 : 61 ))).chr }
  end
}, :after => 'class Tag < ActiveRecord::Base'

generate :model, "tagging post_id:integer tag_id:integer"
inject_into_file 'app/models/tagging.rb', %q{
  belongs_to :post
  belongs_to :tag
}, :after => 'class Tagging < ActiveRecord::Base'

# Configure default_url_options in test environment
inject_into_file "config/environments/test.rb", "  config.action_mailer.default_url_options = { :host => 'example.com' }\n", :after => "config.cache_classes = true\n"

# Add our local Active Admin to the load path
inject_into_file "config/environment.rb", "\n$LOAD_PATH.unshift('#{File.expand_path(File.join(File.dirname(__FILE__), '..', '..', 'lib'))}')\nrequire \"active_admin\"\n", :after => "require File.expand_path('../application', __FILE__)"

# Add some translations
append_file "config/locales/en.yml", File.read(File.expand_path('../templates/en.yml', __FILE__))

# Add predefined admin resources
directory File.expand_path('../templates/admin', __FILE__), "app/admin"

$LOAD_PATH.unshift(File.join(File.dirname(__FILE__), '..', 'lib'))
=end