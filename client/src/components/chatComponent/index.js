import React, { useState } from 'react';
import Axios from "axios";
const GPT4Component = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async () => {
        setIsLoading(true);
        setResponse(''); // 清空先前的响应
        
        try {
            const response = await Axios.post(apiUrl + "/api/chat", {
                prompt: query,
                max_tokens: 100
            });
            setResponse(response);
        } catch (error) {
            console.error('Failed to fetch GPT-4 response:', error);
            // 检查error.response.data是否存在，且是字符串类型
            const errorMessage = error.response && typeof error.response.data === 'string'
                ? error.response.data
                : 'Failed to fetch GPT-4 response';
            setResponse(errorMessage);
        }

        setIsLoading(false); // 加载完成
    };
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh' // 使外部容器占满整个视口高度
          }}>
            <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="有什么问题在这里输入吧^ ^"
                rows="4"
                style={{ width: '80%', justifyContent: 'center'}}
            />
            <button onClick={handleSubmit} style={{ margin: '10px 0' }}>提交</button>
            {isLoading ? (
            <p>加载中...</p> // 这里可以替换为更复杂的加载动画或图标
        ) : (
            <div>
                <strong>回复:</strong>
                <p>{response.data}</p> {/* 确保response.data是字符串 */}
            </div>
        )}
        </div>
    );
};

export default GPT4Component;
