# README

* Versions
	
	ruby 3.1.2p20
	Rails 7.0.3.1

* System dependencies

	Bootstrap CSS rails installation | --css=bootstrap |
	Devise for Authentication
	PostgreSQL

* Configuration
	
	#Turbostream needs to be accepted as a nav format in the Devise initializer
		in config/initializers/devise.rb.

		config.navigational_formats = ['*/*', :html, :turbo_stream]
		config.sign_out_via = :get

	#Custom CSS from app/assets/stylesheets/custom.css
		in app/assets/config/manifest.js

		//= link custom.css
		#needs adjustment for flash alert placement

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions
	
	Previous version on Heroku now, no plans to change yet



* TODO

	adjust stimulus controllers for 9 and 18 versions with a string for pars