# Prerequisites
- A Github or GitLab account to sign in to netlify and clone this repo
- A mongodb database configured with open access from all ip adresses. 

### Database considerations
Use Mongodb Atlas, the free tier should be enough. Make sure you are creating a new user with scope restricted to your current database. Allowing free access from any IP might be a concern but it is necessary as our backend functions are running on dynamically assigned ip resources on `us-east-1` AWS Lambda region. Be sure to also choose aws as your db provider and deploy your db to the same region so as to reduce the latency. Our backend execution needs to complete within 10 seconds per request so reducing latency is important. 

# Deploy to netlify

Click the button below, add your db details and sign in with your Github or GitLab account to deploy to Netlify

[![Deploy](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/git-ayas/extraCommmerce)

# Local development setup
### Setup dependencies
First install your dependencies by running `npm i` in your project root. This will also install netlify-cli to your local project accessible via the path `node_modules/.bin/netlify`. After that you can run `npm run netlify:login` to connect your github project to your netlify deployment. 

### Configure development database access
To setup your local environment to work with db connection add the following block to your netlify.toml, replace the values in quotes with details of your database.
```
[build.environment]
    MONGO_URI = "STAGING_DB_SERVER_URL"
    MONGO_DB_NAME = "STAGING_DB_NAME"
    MONGO_USER = "STAGING_DB_USERNAME"
    MONGO_PASS = "STAGING_DB_USER_PASSWORD"
```
*P.S.: Committing this block into your github repo as this will force your netlify deployments to use these values. As long as that is ok and you don't mind keeping sensitive data on your repo, you can commit this repo, but it is highly recommended that you use your netlify build environment parameters to set the values for your application.*

### Run the development server
Run `npm run start:dev` in your project to launch the development server. This will open 2 tabs: one with `localhost:3000` and one with `localhost:555`. The `localhost:3000` tab is for the react development server and can be closed as it won't have access to the netlify functions development server. 

Your development server(on port 555) is configured to serve your react frontend at root and netlify functions on the `/.netlify/functions/` path, much like your production environment. 

### Hot reload
Editing either your frontend in `./src` or your backend aws lambda functions in `./lambdas` folders will automatically reload your react frontend and netlify functions for a live coding environment.