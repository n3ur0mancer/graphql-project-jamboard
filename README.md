# Getting Started

## Dependencies
Install the dependencies with npm in the project directory.

`$ npm install`

---

## Docker Container
Starting the docker container.

`$ docker-compose-up`

---
## Connecting the DB & starting the server
In the project directory start the application with node.

`$ node src/main.js`

If the connection is successful, the console logs “Connection to DB successful”.
On http://localhost:3000/ the message “App listening at http://localhost:3000” will be displayed.

If the connection fails the messahe "Failed to establish connection to mongoDB." will be displayed.

