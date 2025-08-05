import "./Create-Post.css";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post creation logic here
    const newPost = {
      title,
      content,
      image: imageUrl,
    };
    console.log("Post created!", newPost);
    // Reset form or redirect as needed
    // setTitle("");
    // setContent("");
    // setImageUrl("");
    window.location = "/";
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
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
        <button type="submit">Create Post</button>
      </div>
    </form>
  );
};

export default CreatePost;
