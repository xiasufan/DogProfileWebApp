import React from 'react';

const CheatSheet = () => {
  // 编程提示和代码示例
  const tips = [
    {
      title: "Do something to all element in array",
      code: `let numbers = [1, 2, 3, 4, 5];
let squares = numbers.map(function(num) {
    return num * num;
});
console.log(squares); // 输出: [1, 4, 9, 16, 25]`
    },
    {
      title: "calculate hash looping from two direction",
      code: `function stringToAsciiArray(str) {
        let asciiValues = str.split('').map(function(char) {
            return char.charCodeAt(0);
        });
        
        let sum = 0;
        let length = str.length;
        for(let i = 0; i < length; i++) {
            sum += asciiValues[i] * Math.pow(131, length - 1 - i);
        }
    
        return sum % (Math.pow(10, 9) + 7);
    }
    `
    },
    {
      title: "check if num in an array",
      code: `let numbers = [1, 2, 3, 4, 5];
      let numberToCheck = 3;
      
      let isInArray = numbers.includes(numberToCheck);
      
      console.log(isInArray); // 如果数组包含数字3，输出为 true，否则为 false
      
    `
    },
    {
      title: "append array to array 展开运算符",
      code: `let array1 = [1, 2, 3];
      let array2 = [4, 5, 6];
      
      // 使用展开运算符将 array2 中的元素合并到 array1
      array1.push(...array2);
      
      console.log(array1); // 输出: [1, 2, 3, 4, 5, 6]
      
    `
    },
    {
      title: "Array.from ",
      code: `const APPENDS = ["", ...Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i), (_, i) => String.fromCharCode(97 + i)), ...Array(10).keys()].map(String); 
      
    `
    },
    
    {
      title: "代码优化 ",
      code: `
      function gethash(str){
        let values=str.split('').map(function(char){return char.charCodeAt(0)}));
        let sum =0;
        let length = str.length;
        for(let i = 0; i<length;i++){
          sum+=values[i]*Math.pow(131,length-1-i);
        }
        return sum % (Math.pow(10,9)+7);
      }
      不知道为什么错
      但是
      function gethash(str){
        const mod = Math.pow(10,9)+7
        const values=str.split('').map(char=>char.charCodeAt(0));

        let sum = 0;
        const length=str.length;
        let power = 1;

        for (let i =length-1;i>==;i--){
          sum = (sum+values[i]*power)%mod;
          power = (power*131)%mod;
        }
        return sum;
      }
    `
    },
    {
      title: "reduce sum ",
      code: `
      const numbers = [1, 2, 3, 4, 5];

const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

console.log(sum); // 输出: 15

    `
    },
    {
      title: "hash table ",
      code: `
      function stockPairs(stocksPorfit,target){
        cosnt hashtable = {};
        const pairs = new Set()

        for (let i=0;i<stocksProfit.length;i++){
          const num = stocksPorfit[i]
          const diff = target - num
          if(hashtable[diff]!=null){
            pairs.add(JSON,stringify([num,diff],sort()))
          }
          hashtable[diff] = i
        }
        return pairs.size
      }


    `
    },
    // 更多的提示可以像上面一样添加
  ];

 // CSS 样式
 const containerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const cardStyle = {
  border: '1px solid #ddd',
  padding: '10px',
  margin: '10px',
  backgroundColor: '#f9f9f9',
  transition: 'transform 0.3s ease',
  boxSizing: 'border-box', // 确保内边距和边框不会增加宽度
};

const codeStyle = {
  fontSize: '2em', // 设置字体大小
  overflowWrap: 'break-word', // 确保文本在卡片内换行
};

const handleMouseEnter = (e) => {
  e.currentTarget.style.transform = 'scale(1.05)'; // 放大卡片
  e.currentTarget.style.zIndex = '10'; // 提高卡片的堆叠顺序，确保它在其他元素之上
  };
  
  const handleMouseLeave = (e) => {
  e.currentTarget.style.transform = 'scale(1)'; // 还原卡片大小
  e.currentTarget.style.zIndex = '1'; // 还原卡片的堆叠顺序
  };
  
  
  return (
  <div style={containerStyle}>
  {tips.map((tip, index) => (
  <div 
         key={index} 
         style={cardStyle}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
       >
  <h3>{tip.title}</h3>
  <pre style={codeStyle}>{tip.code}</pre>
  </div>
  ))}
  </div>
  );
  };
  
  export default CheatSheet;