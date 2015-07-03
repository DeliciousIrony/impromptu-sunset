# WordFlow

WordFlow is a text editor with accountability. Instead of just telling writers how many words they've written, it measures the consistency of their typing, and generates a score based on their output. It encourages writers to keep writing by sharing their consistency with other users in real-time, and it helps build good habits by analyzing and keeping track of day-to-day writing output.

## Team

  - __Product Owner__: Ashwin Aravindan
  - __Scrum Master__: Niall O'Kane
  - __Development Team Members__: David Hom

## Table of Contents

1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Server Environment Setup](#server-environment-setup)
    1. [Client Environment Setup](#client-environment-setup)
    1. [Tasks](#tasks)
1. [Team](#team)



## Development

### Installing Dependencies

```
npm install
```

NPM should install bower dependencies automatically.


### Server Environment Setup

#### Description
Follow these instructions to get Postgres up and running for the development and testing environments.

#### Install Postgres
- Install the Postgres app from [http://postgresapp.com/](http://postgresapp.com/)
  - [Next, follow these instructions to set up your bash profile $PATH](http://postgresapp.com/documentation/cli-tools.html)
- Run the Postgres app from your Applications folder

#### Install Sequelize-CLI
- ```npm install -g sequelize-cli```

## Initial Setup

- Clone the repo
- cd impromptu-sunset
- npm install
- grunt setup —user ```YOUR_MAC_USERNAME```
- grunt nodemon


- be sure to change ```YOUR_MAC_USERNAME``` to your actual Mac username
 
### Client Environment Setup

#### Description
Follow these instructions if you want Karma to re-run the tests automatically on a file change.

#### Install the Karma Command Line Tool

```npm install -g karma-cli```

#### Start Karma

```karma start```

### Run Tests

To run the tests after installing, simply type ```grunt test``` into the command line from the root directly.

### Updating Database migrations

Check sequelize-cli for information on how to create migrations. 

### Deploying to Heroku

- grunt deploy --prod  (push to heroku)

- grunt heroku-setup  (runs migrations on heroku)

## Code Documentation

[Documented Client Code here](docs/client/index.html)
[Documented Server Code here](docs/server/index.html)

