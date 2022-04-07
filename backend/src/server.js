import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
// const articleInfo = {
//     'lr':{
//         upvotes:0,
//         comments:[],
//     },
//     'ln':{
//         upvotes:0,
//         comments:[],
//     },
//     'res':{
//         upvotes:0,
//         comments:[],
//     }
// }


const app = express();
app.use(bodyParser.json());

const withDB = async (operations,res) => {
    try {

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
        const db = client.db('my-blog');
        await operations(db)
        client.close()
    }
    catch (error) {
        res.status(500).json({ message: 'Error Not Found', error })
    }
}


// app.get('/api/articles/:name', async (req, res) => {
//     try {
//         const articleName = req.params.name;
//         const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
//         const db = client.db('my-blog');
//         const articleInfo = await db.collection('articles').findOne({ name: articleName })
//         res.status(200).json(articleInfo);
//         client.close()
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Error Not Found', error })
//     }
// })
//Making more Reusable code using withDB function
app.get('/api/articles/:name', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    },res)
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
       
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            $set: {
                upvotes: articleInfo.upvotes + 1
            }
        })
        const updatedArticleinfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleinfo)
   
    // articleInfo[articleName].upvotes += 1
    // res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes}  upvotes `)
    // res.send(`"Hello" ${req.params.name}`)
    },res);
})

app.post('/api/articles/:name/addcmt', async (req, res) => {
    withDB(async (db) => {
        const {username,text} = req.body;
        const articleName = req.params.name;
       
        const articleInfo = await db.collection('articles').findOne({ name: articleName });
        await db.collection('articles').updateOne({ name: articleName }, {
            $set: {
                comments : articleInfo.comments.concat({username , text})
            }
        })
        const updatedArticleinfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleinfo)
   
    // articleInfo[articleName].upvotes += 1
    // res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes}  upvotes `)
    // res.send(`"Hello" ${req.params.name}`)
    },res);
})
//Before WithDB
// app.post('/api/articles/:name/upvote', async (req, res) => {
//     try {
//         const articleName = req.params.name;
//         const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true })
//         const db = client.db('my-blog');
//         const articleInfo = await db.collection('articles').findOne({ name: articleName });
//         await db.collection('articles').updateOne({ name: articleName }, {
//             $set: {
//                 upvotes: articleInfo.upvotes + 1
//             }
//         })
//         const updatedArticleinfo = await db.collection('articles').findOne({ name: articleName });
//         res.status(200).json(updatedArticleinfo)
//         client.close
//     }
//     catch (error) {
//         res.status(500).json({ message: 'Error Not Found', error })
//     }
//     // articleInfo[articleName].upvotes += 1
//     // res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes}  upvotes `)
//     // res.send(`"Hello" ${req.params.name}`)
// })
//Before MongoDB
// app.post('/api/articles/:name/addcmt',(req,res)=>{
//     const {username,text} = req.body;
//     const articleName = req.params.name;
//     articleInfo[articleName].comments.push({username,text});
//     res.status(200).send(articleInfo[articleName].comments  )
//    // res.send(`"Hello" ${req.params.name}`)
// })


// app.get('/hello',(req,res)=>{
//     res.send("Hello Success!")
// })
// app.get('/hello/:name',(req,res)=>{
//     res.send(`"Hello" ${req.params.name}`)
// })
// app.post('/hello',(req,res)=>{
// res.send(`"Hello" ${req.body.name}`)
// })


app.listen(8000, () => {
    console.log("listening")
})