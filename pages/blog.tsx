import styles from "../styles/Blog.module.css";
import { NextPage } from "next";
import { useState, useEffect } from "react";

const Blog: NextPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const clearValue = () => {
    setTitle("");
    setAuthor("");
    setContent("");
  };
  const loadPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data.posts);
    } catch (error) {
      console.log(error);
    }
  };
  const savePost = async () => {
    try {
      const response = await fetch("/api/add_post", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify({
          title: title,
          author: author,
          content: content,
        }),
      });
      const data = response.json();
      console.log(data);
      loadPosts();
      clearValue();
    } catch (error) {}
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <>
      <div className={styles.createForm}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          type="text"
          placeholder="Author"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
        ></textarea>
        <button onClick={savePost}>Save new post</button>
      </div>
      <ul className={styles.list}>
        {posts &&
          posts.map(({ title, author, content }) => (
            <li className={styles.item} key={title}>
              <p className={styles.text}>{title}</p>
              <p className={styles.text}>{author}</p>
              <p className={styles.text}>{content}</p>
            </li>
          ))}
      </ul>
    </>
  );
};

export default Blog;
