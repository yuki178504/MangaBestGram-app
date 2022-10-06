import './App.css';
import React, { useEffect, useState } from 'react';
import instance from './api/api';

const App = () => {

  const [ posts, setPost ] = useState([])

  useEffect(() => {
    handleGetList();
  }, []);

  const handleGetList = async () => {
    try {
      const res = await instance.get('/api/v1/scene_posts');
      console.log(res.data);
      setPost(res.data)
    } catch (e) {
      console.log(e)
    }
  }



  return (
    <div className="App">
      <p>これはテストです</p>
      <p>
        { posts.map((post) => (
          <div>
            <div>APIのテスト</div>
            <div>{ post.scene_title }</div>
          </div>
        )) }
      </p>
    </div>
  );
}

export default App;
