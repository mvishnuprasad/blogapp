// Reusable Article List Component


import React from "react";
import {  Link} from 'react-router-dom';
const ArticleList = ({articles}) => (
    <>
    
    {articles.map(article => (
          <Link className='article-list-item' to={`/art/${article.no}`}>
          <h3 key={article.no}>{article.name}</h3>
          <p>{article.Details.substring(0,100)}...</p>
          </Link>
          
            ))}
    
    </>
)

export default ArticleList;