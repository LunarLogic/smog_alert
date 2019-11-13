# Smog alert

## Requirements

* Ruby 2.6.5
* Node.js
* Install and run PostgreSQL

```
brew update
brew install postgresql
brew services start postgresql
```

### Development setup

* Create `config/master.key` file and insert tke key you can find in [credentials spreadsheet](https://docs.google.com/spreadsheets/d/1R73V6AilcW1EOpdyUY6PX7ZH6O1R9vVUI42WHqj2kMI/edit#gid=0).

* Run below commands

```
rake db:create

bundle install
bundle exec rails s -p 4000
# Compile rails assets
bin/webpack-dev-server

cd frontend
npm install
npm start
```

#### Deployment

* To deploy from master branch use:

`cap staging deploy`

* To specify a branch for deployment use:

`BRANCH=example_branch cap staging deploy`


#### Tips

* Edit credentials in VIM by running:

`EDITOR=vim rails credentials:edit`

* Edit credentials in VSCode by running:

`EDITOR='code --wait' rails credentials:edit`

* To use RuboCop Linter run:

`bundle exec rubocop`

#### Tests

`bundle exec rspec`

