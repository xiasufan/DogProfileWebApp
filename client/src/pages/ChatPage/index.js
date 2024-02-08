import React from 'react';
import styles from './index.module.css';
const Chat = () => {

   // YouTube视频的URL中的ID部分
  const videoId = '306YGE2uwPM';

  // 构造完整的YouTube嵌入视频URL
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
      <div ><iframe
      width="560"
      height="315"
      src={videoSrc}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe></div>
  );
};

export default Chat;