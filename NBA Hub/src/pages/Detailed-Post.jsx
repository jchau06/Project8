import "./Detailed-Post.css";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { useState } from "react";

const DetailedPost = ({
  id,
  title,
  time,
  image,
  content,
  comments,
  upvotes: initialUpvotes,
}) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes || 0);
  const [loading, setLoading] = useState(false);

  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || [])

  const navigate = useNavigate();

  const handleUpvote = async () => {
    if (loading) return;
    setUpvotes(upvotes + 1);
    setLoading(true);

    const { error } = await supabase
      .from("posts")
      .update({ upvotes: upvotes + 1 })
      .eq("id", id);

    if (error) {
      console.error("Error updating upvotes:", error);
      setUpvotes(upvotes); 
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", id);
    
    if ( error ) {
        console.error("Error deleting post:", error);
    } else {
        navigate("/", { state: { refresh: true } });
    }
    }

  return (
    <div className="detailed-post-container">
      <div className="post-header">
        <h2 className="post-title">{title}</h2>
        <div className="post-header-buttons">
          <button
            className="upvote-button"
            onClick={handleUpvote}
            disabled={loading}
          >
            👍 Upvote Post
          </button>
          <Link to={`/post/${id}/edit`}>
            <button className="edit-button">✏️ Edit Post</button>
          </Link>
          <Link to="/">
            <button className="delete-button" onClick={handleDelete}>🗑️ Delete Post</button>
          </Link>
        </div>
      </div>
      <p className="post-time">Posted {time}</p>
      <p className="post-content">{content}</p>
      <img src={image} alt={title} className="post-image" />
      <p className="upvotes-text">
        {upvotes} {upvotes === 1 ? "Upvote" : "Upvotes"}
      </p>
      <div className="comments-section">
        <h3>Comments:</h3>
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <p key={index} className="comment-text">
              {comment}
            </p>
          ))
        ) : (
          <p className="no-comments-text">No comments yet.</p>
        )}
        <input
            type="text"
            placeholder="Leave a comment..."
            className="enter-comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={async (e) => {
                if (e.key === "Enter" && newComment.trim() !== "") {
                const updatedComments = [...commentList, newComment.trim()];


                const { error } = await supabase
                    .from("posts")
                    .update({ comments: updatedComments })
                    .eq("id", id);

                if (error) {
                    console.error("Error adding comment:", error);
                    return;
                }

                setCommentList(updatedComments);
                setNewComment("");
                }
            }}
            />
      </div>
    </div>
  );
};

export default DetailedPost;
