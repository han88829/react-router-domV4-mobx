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
├─public
├─scripts
└─src
    ├─assets       静态资源文件
    ├─component    页面代码
    │  ├─app       菜单内嵌子页面路由
    │  ├─login     登录页
    │  ├─report    报表知识
    │  ├─rtsp      rtsp视频播放
    │  ├─table     表格
    │  ├─test      测试页面
    │  └─user      用户
    ├─Bundle.js    按需加载配置
    ├─index.js     总入口文件
    ├─Route.js     路由配置文件
    └─store        mobx全局状态树
```

##  mobx管理状态
* 保存打开历史

# 进行中
* 后期会针对在后台管理项目上的经验，加入一些自己开发中所经常用到的技术。。。
