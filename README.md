# the Foraging Foodie
## Overview
This is a blog where I share my experiences at different restaurants that helped me re-discover Dallas. I also wanted to use this as practice to fully implement CRUD.
There is a view for the general public, and a slightly different view for those who login, which allows them to see a blog post form, an edit button, and a delete button.

## Technology
the Foraging Foodie was built with:
- HTML
- CSS
- JavaScript
- PostgreSQL
- Express
- React
- Node
- [Yelp API](https://www.yelp.com/developers/documentation/v3/business_search)
- [Auth0](https://auth0.com/)
- [Docker](https://www.docker.com/)
- [Heroku](https://heroku.com)

## Getting Started Locally
1. Install & run Docker
2. Clone this repo `git clone https://github.com/asaudu/ForagingFoodie.git`
3. In the root directory, run `rm -rf .git`, then run `git init` to start your git repository
4. Go to the server folder (`cd server`) in the project and run `npm install`
5. Copy the root example environment file `cp .env.example .env`
    then `npm run db:init`
6. If you want to try the app with Auth0, then be sure to setup
    `cp server/.env.example `
7. Then go to the client folder (`cd..`, then `cd server`) and run `npm install`
8. From the server(running on localhost:3001) and the client(running on localhost:3000), run `npm start`