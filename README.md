# Barber Poll

Little app for quick surveys.

# Setup

* Run `bundle install`
* `rake db:setup`

## Run Barber Poll Server

`rails s`

## Setting up redis

This should be simple.  Once you've cloned the Barber Poll repo you simply open a new terminal window and run the `redis-server` command.  And leave it running.  The purpose of redis is to serve as a message bus between Barber Poll and Poll Pusher (the sister application, see below.)

`redis-server`

## Setting up Poll Pusher

Unfortunately, both BarberPoll and its test suite require this node app to be running in order to work properly.  This involves running a sister project named poll pusher.  Poll Pusher is a node app designed to send updates to the result page dynamically through websockets.  It is a really cool feature, but does complicate the environment.  I will attempt to streamline this process in the future.

* Install Node:
  * `brew install node`
* `git clone https://github.com/rondale-sc/poll_pusher.git`
* `npm install`
* start node service with:
  * `node index.js` (from within the poll_pusher directory)

# Setup (conclusion)

You should end up with three panes open (I prefer using tmux for this) with the following things:

* `rails s`
* `redis-server`
* `node index.js` (from within the Poll Pusher directory)
