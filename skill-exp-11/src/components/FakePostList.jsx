import axios from "axios";
import { useEffect, useState } from "react";

export default function FakePostList() {
  const [posts, setPosts] = useState([]);

  const fetchData = () => {
    axios.get("https://dummyjson.com/posts")
      .then(res => setPosts(res.data.posts));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Fake API Posts</h2>
      <button onClick={fetchData}>Refresh</button>

      {posts.map(p => (
        <p key={p.id}><b>{p.title}</b> - {p.body}</p>
      ))}
    </div>
  );
}