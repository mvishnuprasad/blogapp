import React from 'react';
import { useParams , Link} from 'react-router-dom';
import ArticlesList from '../components/ArticleList'
import NotFound from './NotFoundpage';

import {getArticles} from '../article-content';
let articles = getArticles();
export function ArticlePage() {
    let { name } = useParams(); 
const art = articles.find(articles=> articles.no===name)
if(!art) return <NotFound />

const others = articles.filter(artcle => artcle.no !== name)
    return (
        <div>
            
            <h2>{name}. {art.name}</h2>
            <p>All details about {art.name}</p>
            <p>{art.Details}</p>
            <h2> Similar Articles</h2>
           <ArticlesList  articles={others} />
        </div>
    )
}

