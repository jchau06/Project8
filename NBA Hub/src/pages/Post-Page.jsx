import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import { useEffect, useState } from 'react';
import DetailedPost from './Detailed-Post.jsx';
import { formatDistanceToNow, parseISO } from 'date-fns';

const PostPage = () => {
  const { id } = useParams();  
  const postId = Number(id);

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!postId || isNaN(postId)) return;

    const fetchPost = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const image = data.image_url.startsWith('http')
        ? data.image_url
        : supabase.storage.from('post-images').getPublicUrl(data.image_url).data.publicUrl;

      
      const relativeTime = formatDistanceToNow(parseISO(data.created_at), { addSuffix: true });

      setPost({
        ...data,
        image,
        relativeTime,   
      });
    };

    fetchPost();
  }, [postId]);

  if (!post) return <div>Loading...</div>;

  return (
    <DetailedPost
      id={post.id}
      title={post.title}
      time={post.relativeTime}   
      image={post.image}
      content={post.content}
      comments={post.comments || []}
      upvotes={post.upvotes}
    />
  );
};

export default PostPage;
