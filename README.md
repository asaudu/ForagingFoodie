# the Foraging Foodie
![1](https://user-images.githubusercontent.com/94813320/169441504-d4b7c8c9-be21-41dd-a257-7c31b3e116f8.png)
<hr>
<br>
# Contents

  - [Overview](#overview)
  - [Technology](#technology)
  - [Userflow](#userflow)
  - [Database Schema](#database-schema)
  - [Wireframes](#wireframes)
  - [Getting Started Locally](#getting-started-locally)
  - [Installation](#installation)
<hr>
<br> 
# Overview
This is a blog where I share my experiences at different restaurants that helped me re-discover Dallas. I also wanted to use this as practice to fully implement CRUD.
There is a view for the general public, and a slightly different view for those who login, which allows them to see a blog post form, an edit button, and a delete button.
<hr>
<br>
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
<hr>
<br>
## User Flow
<img width="724" alt="UserFlow" src="https://user-images.githubusercontent.com/94813320/169442015-95393be1-a26d-41e4-a4fe-61a12b75d755.png">

<hr>
<br>
## Database Schema
<img width="717" alt="DBSchema" src="https://user-images.githubusercontent.com/94813320/169442064-0f9da2ac-2d6f-459f-80f3-1521f20c45c1.png">

<hr>
<br>
## Wireframes
<img width="725" alt="PublicView" src="https://user-images.githubusercontent.com/94813320/169442136-2078e52e-583c-4a62-9aa2-98d187615011.png">
<img width="724" alt="UserFlow" src="https://user-images.githubusercontent.com/94813320/169442148-150c30cc-fe26-4045-bac2-bc10eb19e31f.png">

<hr>
<br>
## Getting Started Locally
### Prerequisites
**Docker**

This project relies on Docker for to run the PostgreSQL server for registered users. To use those features, you must install Docker first before continuing.

Windows:
- Follow Microsoft's instructions to install [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and [Docker](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers#install-docker-desktop).

MacOS:
- Use [Homebrew](https://docs.brew.sh/Installation): `brew install --cask docker`
- [Follow the instructions on the Docker website](https://www.docker.com/)

Launch Docker Desktop once it is installed. 

**Node**

You'll need to install Node v14 or above. [`nvm`](https://github.com/nvm-sh/nvm) is highly recommended.
<hr>
<br>
### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/asaudu/ForagingFoodie.git
   ```
2. Install all NPM packages using this in the root directory:
   ```sh
   npm install
   ```
3. Database setup:
   1. Copy the root example environment file

   ```sh
   cp .env.example .env
   ```
   2. You can choose to edit `.env` or just use as-is.
   3. Run the following to setup the database with the seed file:
   ```sh
   npm run db:init
   ```

Start the app and view it at <http://localhost:3000> by using:
   ```sh
   npm start
   ```
Shut Down the Express and React development servers using `Ctrl-C` .

<hr>
<br>
#### Set Up React client for `auth0`
If you want to try it with Auth0, the frontend needs to be setup with the following:

1. Copy the app's example environment file

   ```sh
   cp app/.env.example app/.env
   ```

2. The `.env` file allows the React app to use Auth0, and requires an Auth0 domain + client-id.
   - These can be obtained by signing up for an Auth0 account and [Registering a Single-Page Web Application](https://auth0.com/docs/get-started) in order to get these values.
   - This [graphic](https://images.ctfassets.net/23aumh6u8s0i/1DyyZTcfbJHw577T6K2KZk/a8cabcec991c9ed33910a23836e53b76/auth0-application-settings) from [Auth0's guide](https://auth0.com/blog/complete-guide-to-react-user-authentication/#Connect-React-with-Auth0) may be helpful to locating them.
