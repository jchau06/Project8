import "./Edit-Post.css";
import { useState } from "react";

const EditPost = ({ title: initialTitle, content: initialContent, image: initialImage }) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const [imageUrl, setImageUrl] = useState(initialImage || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const editedPost = {
      title,
      content,
      image: imageUrl,
    };

    console.log("Post edited!", editedPost);
    window.location = "/";
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
        />
        <textarea
          placeholder="Content (Optional)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="content-input"
        />
        <input
          type="text"
          placeholder="Image URL (Optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="image-input"
        />
        <button type="submit">Edit Post</button>
      </div>
    </form>
  );
};

export default EditPost;
