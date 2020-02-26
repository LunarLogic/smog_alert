# Smog alert

[![CircleCI](https://circleci.com/gh/LunarLogic/smog_alert.svg?style=svg&circle-token=cca65188e46e468ae17d54c96244c724b568a0cb)](https://circleci.com/gh/LunarLogic/smog_alert)

## Requirements

- Ruby 2.6.5
- Node.js

Ensure you use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager) and only then install yarn via brew.

```
brew install yarn
```

- Install and run PostgreSQL

```
brew update
brew install postgresql
brew services start postgresql
```

- Install and run Redis

```
brew update
brew install redis
brew services start redis
```

- Install ImageMagic

```
brew install imagemagick
```

### Development setup

- Create `config/master.key` file and insert tke key you can find in [credentials spreadsheet](https://docs.google.com/spreadsheets/d/1R73V6AilcW1EOpdyUY6PX7ZH6O1R9vVUI42WHqj2kMI/edit#gid=0).

- Run below commands

```
bundle install
yarn install

# setup database
rake db:setup

bundle exec rails s

# In separate terminal window run:
bin/webpack-dev-server

# In separate terminal window run:
bundle exec sidekiq

# To run migrations in database:
rails db:migrate
RAILS_ENV=test rails db:migrate
```

- Run seeds to setup sample records in database (email: admin@example.com, password: `123456`)

```
rails db:seed
```

- You can see background jobs in Sidekiq web view by visiting http://localhost:3000/sidekiq You must be signed in as admin user.

- To check Rails routes

```
rails routes
```

- To use Guard run

```
guard
```

in command line. Then when you save a file guard will automatically run tests for it

### Editor config

- Visual Studio Code

* Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
* Go to `Code > Peferences > Settings > Text Editor > Formatting`
  Turn on `Format On Save` checkbox
  From now on every change in code base will be automatically formatted by [Prettier](https://prettier.io/).

#### Deployment

- To deploy from master branch use:

`cap staging deploy`

- To specify a branch for deployment use:

`BRANCH=example_branch cap staging deploy`

- Run DB seeds on container:

`cap staging deploy:seed`

#### Tips

- Edit credentials in VIM by running:

`EDITOR=vim rails credentials:edit`

- Edit credentials in VSCode by running:

`EDITOR='code --wait' rails credentials:edit`

or

`EDITOR='code --wait' rails credentials:edit -e staging`

- To use RuboCop Linter run:

`bundle exec rubocop`

- How to run rails console inside of staging container:

```
ssh smogalert@staging.smogalert.lunarlogic.io

# go to rails project directory
smogalert@staging:~$ cd application/current

# open rails console
RAILS_ENV=staging /usr/local/rbenv/bin/rbenv exec bundle exec rails console
```

#### Tests

- Run the test suite: `bundle exec rspec`

- Run tests in Chrome browser in development: `CHROME=true rspec spec/features/homepage_spec.rb`
