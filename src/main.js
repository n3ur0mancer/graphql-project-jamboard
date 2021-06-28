const mongoose = require('mongoose');
const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql');

const User = require('./mongo/users');
const Board = require('./mongo/boards');

const PORT = 3000

const app = express()
app.use(express.json());
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something is not working!');
});

const schema = buildSchema(` 
    input UserInput {       
        firstName: String       
        lastName: String       
        emailAddress: String!           
    }    
    type User {        
        _id: String        
        firstName: String        
        lastName: String        
        emailAddress: String
    }  
    
    
    input BoardInput {            
        owner: String        
    } 
    type Board {        
        _id: String               
        owner: String 
    }
    
    
    input EditorInput { 
        boardId: String           
        editor: String        
    } 
    type Editor { 
        boardId: String                      
        editor: [String] 
    }
    
    
    input PostInput {
        boardId:String
        text:String
        author:String
        x:Int
        y:Int
    }
    type Post { 
        _id: String
        text:String
        author:String
        x:Int
        y:Int
    }
    
    
    input UpdatePostInput {
        boardId:String
        postId:String
        text:String
    }   
    input DeletePostInput { 
        boardId: String           
        postId: String        
    } 
    type DeletePost {                    
        postId: String  
    }   
   
    
    input DeleteBoardInput { 
        boardId: String                
    } 
    type DeleteBoard {            
        boardId: String  
    }
      
      
    type Query {     
        userById(id:String!): User  
        boardById(id:String!): Board      
    }    
    type Mutation {     
        createUser(user: UserInput): User   
        createBoard(board: BoardInput): Board 
        deleteBoard(deleteBoard: DeleteBoardInput): DeleteBoard
        
        addBoardEditor(editor: EditorInput): Editor   
        deleteBoardEditor(editor: EditorInput): Editor 
        
        addBoardPost(post: PostInput): Post
        deleteBoardPost(deletePost: DeletePostInput): DeletePost
        updateBoardPost(post: UpdatePostInput): Post
    }  
     
    `);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: {

//USERS
        async userById({id}){
            const user = await User.findById(id);
            return user;
        },
        async createUser({user}){
            const model = new User(user);
            await model.save();
            return model;
        },

//BOARDS
        async createBoard({board}){
            const model = new Board(board);
            await model.save();
            return model;
        },
        async addEditor({editor}){
            const board = await Board.findOne({_id: editor.boardId});
            board.editors.push(editor.editor);
            await board.save();
        },
        async deleteBoard({deleteBoard}){
            const board = await Board.deleteOne({ _id: deleteBoard.boardId});
            console.log(board);
        },

//POSTS
        async addBoardPost({post}){
            const board = await Board.findOne({_id: post.boardId});
            console.log(board)
            board.post.push(post);
            await board.save();
        },

        async updatePost({post}){
            const board = await Board.findOneAndUpdate(
                {_id: post.boardId, "posts._id" : post.postId},
                {$set: {"posts.$.text": post.text}});
            console.log(board);
        },

        async deletePost({deletePost}){
            const board = await Board.updateOne(
                {_id: deletePost.boardId},
                {$pull: {posts: {_id: deletePost.postId}}});
            console.log(board);
        },

        async deleteEditor({deleteEditor}){
            const board = await Board.updateOne(
                {_id: deleteEditor.boardId},
                {$pull: {editors: deleteEditor.editorId}});
            console.log(board);
        }
    },
    graphiql: true,
}));


mongoose.connect('mongodb://localhost:27017', {
    user: 'root',
    pass: 'test',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, error => {
    if(!error) {
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`)
        })
    } else {
        console.error('Failed to establish connection to mongoDB.', error);
    }
});