class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def create
    render text: "Post request recieved <br> #{params.inspect}"
  end

  def data_method
    render text: "#{request.request_method} request recieved <br> #{params.inspect}"
  end
end
