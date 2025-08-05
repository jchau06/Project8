import './Post.css'
import { Link} from 'react-router-dom'

const Post = ( props ) => {
   return (
        <div className="post-container">
            <Link to={`/post/${props.id}`} className='post-link'>
                <p className='time-text'>Posted {props.time}</p>
                <h3 className='title-text'>{props.title}</h3>
                <p className='upvotes-text'>{props.upvotes} upvotes</p>
            </Link>
        </div>
   ) 
}

export default Post;