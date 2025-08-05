import "./Detailed-Post.css";

const DetailedPost = ({ title, time, image, content, comments, upvotes }) => {
  return (
    <div className="detailed-post-container">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <div className="post-header-buttons">
            <button className='upvote-button'>👍 Upvote Post</button>
            <button className="edit-button">✏️ Edit Post</button>
            <button className="delete-button">🗑️ Delete Post</button>
        </div>
      </div>
      <p className="post-time">Posted {time} ago</p>
      <p className="post-content">{content}</p>
      <img src={image} alt={title} className="post-image" />
      <p className='upvotes-text'>{upvotes} Upvotes</p>
      <div className="comments-section">
        <h3>Comments:</h3>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <p key={index} className="comment-text">
              {comment}
            </p>
          ))
        ) : (
          <p className="no-comments-text">No comments yet.</p>
        )}
        <input type="text" placeholder='Leave a comment...' className='enter-comment'/>
      </div>
    </div>
  );
};

export default DetailedPost;
