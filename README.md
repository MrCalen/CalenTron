CalenTron
====

[![Build Status](https://travis-ci.org/MrCalen/CalenTron.svg?branch=master)](https://travis-ci.org/MrCalen/CalenTron)

CalenTron is an Electron App used as a
dashboard for my personal use.

Backend
-

The backend is a nodejs simple app.

It handles the login via JWT access tokens
and a SQLite database to store the user. The user's
passwords are bcrypt'ed and stored in database.

The main job of this API is to offer a wrapper around
multiples API's which I use for my widgets.

Electron
-

The front end is an Electron App. Currently, Electron's part is really
small, but it will soon manage notifications with a link between
Electron and Angular.

The front is written in AngularJS, with a huge use of directive (one for each widget)
and Angular Routing for authentication.

Currently the widgets are:
- Clock Widget
- Weather Widget
- Ping widget with graph on a website
- TODO list
- Transport widget with the next tramways and subways in my home's direction
- Last Cyanide and Happiness comic