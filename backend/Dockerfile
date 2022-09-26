FROM ruby:2.7.5
RUN apt-get update -qq && apt-get install -y build-essential nodejs

RUN mkdir /myapp
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock
RUN gem install bundler
RUN bundle install

RUN mkdir -p tmp/sockets
