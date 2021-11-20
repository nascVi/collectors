import { useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {getPost, upvotePost, downvotePost} from '../fauna/models'
import {FontAwesomeIcon, faThumbsDown, faThumbsUp} from 'react-fontawesome'

const Blog = () => {
  const {id} = useParams()
  const [blogData, setBlogData] = useState({})

  const handleUpvote = async e => {
    let blog = await upvotePost(blogData.upvote+1, id)
    setBlogData(blog)
  }

  const handleDownvote = async e => {
    let blog = await downvotePost(blogData.downvote+1, id)
    setBlogData(blog)
  }
  useEffect(() => {
    async function fetchBlog() {
      let data = await getPost(id)
      setBlogData(data)
    }
    fetchBlog();
  }, [id, blogData])
  return (
    <div>
      <img src={blogData.avatar} width="100%" height="400px" alt=""/>
      <h1>{blogData.title}</h1>
      <span className="text-muted">{blogData.author && `Post by ${blogData.author.username}`} on {blogData.created__at}</span>
      <hr/>
      <div dangerouslySetInnerHTML={{__html: blogData.body}}></div>
      <hr/>
      <div>
        <button 
          onClick={handleUpvote}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button> {blogData.upvote}
        <span style={{margin: "10px"}}></span>
        <button 
          onClick={handleDownvote}>
            <FontAwesomeIcon icon={faThumbsDown} />
        </button>{blogData.downvote}
      </div>
    </div>
  )
}

export default Blog
