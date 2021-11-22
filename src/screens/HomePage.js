import { useEffect, useState } from 'react';
import BlogPreview from '../components/blog-preview/BlogPreview'
import {getPosts} from '../fauna/models'

export default function HomePage() {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    async function fetchBlogs() {
      // You can await here
      let data = await getPosts()
      setBlogs(data)
    }
    fetchBlogs();
  }, [])
  return (
    <div className="">
        <hr/>
      <div className="row">
        {blogs.length > 0 ? blogs.map((blog, idx) => 
            <BlogPreview 
            key={idx}
            id={blog.ref.value.id}
            title={blog.data.title}
            author={blog.data.author}
            avatar={blog.data.avatar}
            upvote={blog.data.upvote}
            downvote={blog.data.downvote}/>
        ): 'No blog has been created yet. Be the first to create'}
      </div>
    </div>
  );
}
