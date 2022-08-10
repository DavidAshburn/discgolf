# README

* Versions
	ruby 3.1.2p20
	Rails 7.0.3.1
	
* System dependencies

	Bootstrap CSS rails installation | --css=bootstrap |
	Devise for Authentication | gem |

	"@hotwired/stimulus": "^3.1.0",
    "@hotwired/turbo-rails": "^7.1.3",
    "@popperjs/core": "^2.11.5",
    "bootstrap": "^5.2.0",
    "bootstrap-icons": "^1.9.1",
    "esbuild": "^0.14.54",
    "sass": "^1.54.3"
    
* Configuration

	#Turbostream needs to be accepted as a nav format in the Devise initializer
		in config/initializers/devise.rb.

		config.navigational_formats = ['*/*', :html, :turbo_stream]
		config.sign_out_via = :get

	#Custom CSS from app/assets/stylesheets/custom.css
		in app/assets/config/manifest.js

		//= link custom.css
		#this just keeps the flash alerts in the right place for now, styles are kept pretty simple for now

* Configuration TODO List

	#Devise mailer production default_url TODO
		in config/environments/production.rb

		config.action_mailer.default_url_options = { host: ???, port: ??? }

	#Database config for production TODO
		in config/database.yml

		production database is marked as sqlite3 here, but Heroku allocated and seems to be using a PostgreSQL db as instructed in the Gemfile

		?create database.yml.template and .git-ignore database.yml
		?look into environment variables, for user pass and db location
		?not sure if this matters since there will only be one instance of this application

	#git-ignore

		?app/assets/builds

* Database creation
	SQLite3 in Development/Testing
	PostgreSQL in Production

		#I might want to refactor for PostgreSQL in Development/Testing
		#I can get rid of those ridiculous one,two...nine variables in Variants and Cards by storing arrays in the database
		#I could also use strings and serialize them myself since there's so little data and it's very simple

* Database initialization
	No seed required

* How to run the test suite
	#Gee, I should probably make one of those
	#i know how to RSpec for imperative functions but I need to learn how to test Rails site functionality (relations, requests/responses, etc.)


* Services (job queues, cache servers, search engines, etc.)
	#TODO: Bring in the PDGA APIs
		#Disc information
		#Course information

* Deployment instructions
	Deployed to coachhuck.herokuapp.com

		heroku run rake db:migrate --app coachhuck


