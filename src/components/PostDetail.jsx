import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'DELETE',
  });
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
    method: 'PATCH',
    data: { title: 'REACT QUERY FOREVER!!!!' },
  });
  return response.json();
}

export function PostDetail({ post }) {
  const deleteMutation = useMutation((postId) => deletePost(postId));
  const updateMutation = useMutation((postId) => updatePost(postId));

  // replace with useQuery
  const { data, isLoading, isError } = useQuery(['comments', post.id], () =>
    fetchComments(post.id)
  );

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      {deleteMutation.isError && <h1 style={{ color: 'red' }}>Error deleting post</h1>}
      {deleteMutation.isLoading && <h1 style={{ color: 'purple' }}>Deleting post</h1>}
      {deleteMutation.isSuccess && <h1 style={{ color: 'green' }}>Post has (not) been deleted</h1>}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
      {updateMutation.isError && <h1 style={{ color: 'red' }}>Error updating post</h1>}
      {updateMutation.isLoading && <h1 style={{ color: 'purple' }}>Updating post</h1>}
      {updateMutation.isSuccess && <h1 style={{ color: 'green' }}>Post has (not) been updated</h1>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </div>
  );
}
