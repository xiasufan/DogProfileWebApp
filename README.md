1. Download everything
2. Split terminal into 2
3. install everything
4. Clien: npm start  Server: node index.js
5. Modify as you like, dont forget to setup your .env file
Live Demo: https://www.xiasufan.com

```
dogapp
├─ client
│  ├─ .env
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ assets
│  │  │  ├─ base_character.png
│  │  │  ├─ bigmap.png
│  │  │  ├─ custom
│  │  │  │  ├─ body1.png
│  │  │  │  └─ hair1.png
│  │  │  ├─ player.png
│  │  │  ├─ shader
│  │  │  │  └─ colorChange.frag
│  │  │  └─ testmap.png
│  │  ├─ dog.riv
│  │  ├─ favicon.ico
│  │  └─ index.html
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.js
│  │  ├─ components
│  │  │  ├─ animationComponent
│  │  │  │  └─ index.js
│  │  │  ├─ checkLoginComponent
│  │  │  │  └─ index.js
│  │  │  ├─ gameComponent
│  │  │  │  ├─ index.js
│  │  │  │  ├─ scenes
│  │  │  │  │  ├─ bootScene.js
│  │  │  │  │  ├─ mainScene.js
│  │  │  │  │  └─ testScene.js
│  │  │  │  └─ utils
│  │  │  ├─ loginComponent
│  │  │  │  ├─ index.js
│  │  │  │  └─ index.module.css
│  │  │  ├─ mainComponent
│  │  │  │  ├─ index.js
│  │  │  │  └─ index.module.css
│  │  │  └─ navbarComponent
│  │  │     ├─ index.js
│  │  │     └─ index.module.css
│  │  ├─ index.js
│  │  └─ pages
│  │     ├─ AboutPage
│  │     │  ├─ index.js
│  │     │  ├─ index.module.css
│  │     │  └─ Sufan Xia CV.pdf
│  │     ├─ Friend.js
│  │     ├─ History.js
│  │     ├─ HomePage
│  │     │  ├─ index.js
│  │     │  └─ index.module.css
│  │     └─ PlaygroundPage
│  │        ├─ index.js
│  │        └─ index.module.css
│  └─ static.json
├─ README.md
└─ server
   ├─ .dockerignore
   ├─ .env
   ├─ Dockerfile
   ├─ index.js
   ├─ package-lock.json
   └─ package.json

```