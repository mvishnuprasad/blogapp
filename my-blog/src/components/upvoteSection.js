import React from 'react'
const upvoteSection = ({articleName,upvotes ,setArticleInfo})=> {
    const upvotearticle = async () => {
      const result =  await fetch (`/api/articles/${articleName}/upvote`,{
            method : 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
        <div id='upvote-section'>
            <button onClick={()=>upvotearticle()}>Add Upvote</button>
            <p>Upvoted by {upvotes} peoples</p>
        </div>
        );
        
}
export default upvoteSection;