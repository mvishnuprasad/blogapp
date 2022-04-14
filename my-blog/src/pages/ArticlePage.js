import React ,{useState , useEffect} from 'react';
import { useParams , Link} from 'react-router-dom';
import ArticlesList from '../components/ArticleList'
import NotFound from './NotFoundpage';
import upvoteSection from '../components/upvoteSection';
import Commentslist from '../components/Commentslist';
import {getArticles} from '../article-content';
let articles = getArticles();
export function ArticlePage() {
    let { name } = useParams(); 
const art = articles.find(articles=> articles.no===name)
const [articleInfo , setArticleinfo] = useState({upvotes:0 , comments:[]});
useEffect(() => {
    const fetchData = async () => {
const result = await fetch(`/api/articles/${name}`)
const body = await result.json();
setArticleinfo(body)
    }
    fetchData()
   
},[name])
if(!art) return <NotFound />

const others = articles.filter(artcle => artcle.no !== name)

    return (
        
        <div>
            
            <h2>{name}. {art.name}</h2>
            
            <h3>All details about {art.name}</h3>
            {/* <p>Upvoted by {articleInfo.upvotes} peoples</p> */}
            <upvoteSection  articleName = {art.name} upvotes = {articleInfo.upvotes} setArticleinfo = {setArticleinfo} />
            <p>{art.Details}</p>
            <Commentslist comments = {articleInfo.comments} />
            <h2> Similar Articles</h2>
           <ArticlesList  articles={others} />
        </div>
    )
}

