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

        setIsLoading(false); 
    };
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything here ^-^"
                rows="4"
                style={{ width: '80%', justifyContent: 'center'}}
            />
            <button onClick={handleSubmit} style={{ margin: '10px 0' }}>Send</button>
            {isLoading ? (
            <p>Loading...</p> 
        ) : (
            <div>
                <strong>Response:</strong>
                <p>{response.data}</p> 
            </div>
        )}
        </div>
    );
};

export default GPT4Component;
