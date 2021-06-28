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

---

## GraphQL 

To use the GraphiQL editor refer to http://localhost:3000/graphql .

### User Operations 

#### Creating a User
```
mutation {
    createUser(user:{
        firstName:"Max"
        lastName:"Zimmer"
        emailAddress:"mzimmer@hotmail.de"
    })
    {
    _id
    }
}
```

#### Finding a User by its ID
```
query {
  userById(id: "60d9ba5887eb9c8237e49a68"){
    firstName
    lastName
    emailAddress
    _id
  }
}
```

---

### Board Operations

#### Creating a Board
Please note, that the owner id is not static, it only serves demonstration purposes.
```
mutation {
  createBoard(board: {owner: "60d9ba5887eb9c8237e49a68"}){
    _id
  }
}
```
#### Deleting a Board by its ID
```
mutation {
  deleteBoard(deleteBoard: {boardId: "60d9bbfd87eb9c8237e49a6c"}) {
    boardId
  }
}
```

To check if the board was actually deleted, please refer to http://localhost:8081/db/test/boards and check if the board is gone.

---

### Editor Operations

#### Adding an Editor to a Board
```
mutation {
  addBoardEditor(editor:{
    boardId: "60d9bbbe87eb9c8237e49a69", 
    editor:"60d9ba5887eb9c8237e49a68"}) 
  {
    editor
  }
}
```
#### Deleting an Editor from a Board
Please note, that the ids are not static, they only serves demonstration purposes.
```
mutation {
  deleteEditor(deleteEditor: {
    boardId: "60d9bbbe87eb9c8237e49a69", 
    editorId: "60d9ba5887eb9c8237e49a68"}) 
  {
    editorId
  }
}
```
To check if the board was actually deleted, please refer to http://localhost:8081/db/test/boards and check if the editor is gone.

---

### Posts Operations

#### Adding a Post to a Board
Please note, that the owner id is not static, it only serves demonstration purposes.
```
mutation {
  addBoardPost(post: {
    boardId: "60d9bbbe87eb9c8237e49a69", 
    text: "Beispiel Nummer 83848294", 
    author: "60d9ba5887eb9c8237e49a68", 
    x: 1, 
    y: 2}) 
  {
    text
  }
}
```
#### Updating a Post on a Board by its ID
Please note, that the owner id is not static, it only serves demonstration purposes.
```
mutation {
  updateBoardPost(post: {
    boardId: "60d9bbbe87eb9c8237e49a69", 
    postId: "60d9db89684bf102a60c595d", 
    text: "Hmm, der Text ist neu..."}) 
  {
    text
  }
}
```
#### Deleting a Post on a Board by its ID
Please note, that the owner id is not static, it only serves demonstration purposes.
```
mutation {
  deleteBoardPost(deletePost: {
    boardId: "60d9bbbe87eb9c8237e49a69", 
    postId: "60d9ba5887eb9c8237e49a68"}) 
  {
    postId
  }
}
```