import {Link} from 'react-router-dom'
import {FontAwesomeIcon, faThumbsDown, faThumbsUp} from 'react-fontawesome'

export default function BlogPreview({id, title, author, avatar, upvote, downvote}) {

  return (
    <div className="col-md-4 col-sm-6 card" style={{maxWidth: '380px', margin:'18px', marginLeft: '50px'}}>
      <img className="card-img-top" height="50%" src={avatar} alt=""/>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">Post created by {author.username}</p>
        <div style={{margin: '5px'}}>
        <button onClick={() => {alert('View this blog to upvote it')}}>
            <FontAwesomeIcon icon={faThumbsUp} />
        </button> {upvote}
        <span style={{margin: "10px"}}></span>
        <button onClick={() => {alert('View this blog to downvote it')}}>
           <FontAwesomeIcon icon={faThumbsDown} />
        </button>{downvote}
      </div>
        <Link to={`/blogs/${id}`} className="btn btn-primary">Read blog</Link>
      </div>
    </div>
  )
}
