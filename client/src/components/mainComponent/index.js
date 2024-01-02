import React, { useState,useEffect} from 'react';
import styles from './index.module.css'
import Axios from 'axios';

export default function Main({loginName}) {
    return (
        <div>welcome {loginName}
        
        <h1>暂时什么都做不了 敬请期待哈哈</h1>
        </div>
    );
      
    
  }