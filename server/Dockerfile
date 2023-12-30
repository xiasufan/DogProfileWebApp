# 使用 Node.js 官方镜像作为基础镜像
FROM node:14

# 设置容器内应用的工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目文件到容器内
COPY . .

# 暴露容器运行时的端口
EXPOSE 3000

# 定义运行时的命令
CMD ["node", "index.js"]
