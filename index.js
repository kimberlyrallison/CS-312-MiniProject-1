import express from "express";
const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

// main home page
app.get("/", (req, res) => {
    res.render("index.ejs", {posts: req.app.locals.blogPosts});
});

// edit post page
app.get("/editPost", (req, res) => {
    // find blog post
    var post = req.app.locals.blogPosts.find(post => post.id === parseInt(req.query.id));

    if( !post ) 
        post = {id: undefined, name: undefined, date: undefined, title: undefined, content: undefined};

    res.render("editPost.ejs", {post:post});
});

// process form results
app.post("/save", (req, res) => {

    // add new post
    const newPost = 
        {
            id: Date.now(),
            name: req.body.name,
            date: new Date(),
            title: req.body.title,
            content: req.body.content 
        }
    
    var postIndex = req.app.locals.blogPosts.findIndex(post => post.id === parseInt(req.body.id));

    if( postIndex>=0 )
    {
        newPost.id = parseInt(req.body.id);
        req.app.locals.blogPosts[postIndex] = newPost;
    }
    else
    {
        req.app.locals.blogPosts.push(newPost);
    }
     
    // render all posts
    res.render("index.ejs", {posts: req.app.locals.blogPosts});
});

// process delete post
app.get("/delete", (req, res) => {
    req.app.locals.blogPosts = req.app.locals.blogPosts.filter(post => post.id !== parseInt(req.query.id));

    // render all post
    res.render("index.ejs", {posts: req.app.locals.blogPosts});
});

app.listen(port, () => {
 console.log(`Server running on port ${port}.`);
});

// array of initial blog posts
app.locals.blogPosts = [
    {
        id: 1,
        name:'Bob',
        date: new Date(),
        title: 'My First Blog Post',
        content: 'This is my first blog post!'
    },
    {
        id: 2,
        name:'Bob',
        date: new Date(),
        title: 'My Second Blog Post',
        content: 'I loved posting my first blog post so much that I had to post a second! This is the best blog ever.'
    }
]