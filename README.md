# UniApp + Typescript + Vite

## 项目安装依赖

```bash
npm install
```

## 运行项目

```bash
npm run dev:%PLATFORM%
```

## 发布项目

```bash
npm run build:%PLATFORM%
```

`%PLATFORM%` 可取值如下：

| 值                      | 平台              |
| ----------------------- | ----------------- |
| app                     | 生成 app 打包资源 |
| h5                      | h5                |
| mp-alipay               | 支付宝小程序      |
| mp-baidu                | 百度小程序        |
| mp-kuaishou             | 快手小程序        |
| mp-lark                 | 飞书小程序        |
| mp-qq                   | qq 小程序         |
| mp-toutiao              | 头条小程序        |
| mp-weixin               | 微信小程序        |
| quickapp-webview        | 快应用(webview)   |
| quickapp-webview-huawei | 快应用华为        |
| quickapp-webview-union  | 快应用联盟        |

## 工程目录结构

```bash
uni-app-vite
┣ uniCloud                  # 云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb
┣ dist                      # 非工程代码，存放运行或发行的编译结果
┣ mock                      # 项目mock 模拟数据
┣ src                       # 源代码
┃ ┣ common                  # 公用的资源
┃ ┣ components              # uni-app组件目录,easycom技术,免引用、注册，直接使用各种符合规范vue组件
┃ ┣ hybrid                  # App端存放本地html文件的目录
┃ ┣ pages                   # 主包根目录
┃ ┣ platforms               # 存放各平台专用页面的目录
┃ ┣ services                # 后台接口服务
┃ ┣ static                  # 存放应用引用静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
┃ ┣ stores                  # store管理
┃ ┣ uni_modules             # 存放uni_module规范的插件
┃ ┣ nativeplugins           # App原生插件
┃ ┣ App.vue                 # 应用配置，用来配置App全局样式以及监听
┃ ┣ env.d.ts                # TS声明文件
┃ ┣ main.ts                 # 入口文件 加载组件 初始化等
┃ ┣ manifest.json           # 配置应用名称、appid、logo、版本等打包信息
┃ ┣ pages.json              # 配置页面路由、导航条、选项卡等页面类信息
┃ ┗ uni.scss                # uni-app内置的常用样式变量
┣ .env.xx                   # 环境变量配置
┣ index.html                # html模板
┣ package.json              # 项目描述及依赖
┣ README.md                 # 项目说明
┣ tsconfig.json             # Typescript 配置文件
┣ uno.config.ts             # Unocss 配置文件
┗ vite.config.ts            # vite 基本配置文件
```

## Customize configuration

See [Configuration Reference](https://uniapp.dcloud.io/collocation/pages).
