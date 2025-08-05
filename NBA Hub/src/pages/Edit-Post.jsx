import "./Edit-Post.css";
import { useState } from "react";
import { supabase } from "../client"; 

const EditPost = ({
  title: initialTitle,
  content: initialContent,
  image: initialImage,
  id,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const [imageUrl, setImageUrl] = useState(initialImage || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const editedPost = {
      title,
      content,
      image_url: imageUrl,
    };

    const { error } = await supabase
      .from("posts")
      .update(editedPost)
      .eq("id", id);

    if (error) {
      console.error("Error updating post:", error);
      setError("Failed to update post. Please try again.");
      setLoading(false);
      return;
    }

    setLoading(false);
    
    window.location.href = `/post/${id}`;
  };

  return (
    <form className="edit-post-form" onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="title-input"
          disabled={loading}
        />
        <textarea
          placeholder="Content (Optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
          disabled={loading}
        />
        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="image-input"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Edit Post"}
        </button>
        {error && <p className="error-text">{error}</p>}
      </div>
    </form>
  );
};

export default EditPost;
