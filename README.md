## 使用技术

- "react-dom": "^16.0.0",
- "react-router-dom": "^4.2.2"
- "mobx": "^3.3.0"
- "mobx-react": "^4.3.3"

## 如何开始项目


* `npm i` ,`cnpm i` or `yarn` 下载依赖包
* `npm start` 开启项目并运行在3000端口
* `npm run build` 打包项目

## 目录结构


```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    index.js //主页面
    Route.js //路由
    store/
      store.js //状态树
      fetchData.js //子状态树
    component/
      app.js  //首页
      user.js //app子页面
      amdin.js //app同级页面
```
