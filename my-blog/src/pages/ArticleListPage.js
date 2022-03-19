import React from 'react';
import ArticlesList from '../components/ArticleList' // Reusable List Component
import {getArticles} from '../article-content'; // Article Content Array
let articles = getArticles();

const ArticleListPage = () => (
    <>
        <h1>Articles</h1>
        <h2>Animalia</h2>
        <p>
            Animals (also called Metazoa) are multicellular, eukaryotic organisms 
            in the biological kingdom Animalia. With few exceptions, animals consume 
            organic material, breathe oxygen, are able to move, can reproduce sexually, 
            and go through an ontogenetic stage in which their body consists of a hollow 
            sphere of cells, the blastula, during embryonic development.
        </p>

       <ArticlesList articles={articles} />

    </>
);

export default ArticleListPage;