import { supabase } from "../client";
import "./Create-Post.css";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
        .from('posts')
        .insert({
            title: title,
            content: content,
            image_url: imageUrl,
            comments: []
        }).single();

        if (error) {
            console.error("Error creating post:", error)
            return;
        }

    console.log("Inserted data:", data);
    window.location = '/';
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
