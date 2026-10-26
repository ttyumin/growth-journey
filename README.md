# 成长印记 · 个人成长记录集

一段一程，皆是风景。以人生六个重要阶段为主线，记录心得感悟与照片。

## 访问

- 用户名：`zjttym`
- 密码：`YM@y700811m`（代码中以 SHA-256 哈希存储，不出现明文）

## 添加照片

把照片放入 `images/` 文件夹，按以下命名即可自动显示（缺失时显示占位图）：

```
images/01-childhood.jpg   童年时光
images/02-school.jpg      青葱岁月
images/03-college.jpg     大学时代
images/04-career.jpg      步入职场
images/05-family.jpg      成家立业
images/06-present.jpg     当下与未来
```

## 添加/修改用户

编辑 `script.js` 顶部的 `USERS` 对象，value 为新密码的 SHA-256 哈希。
计算哈希：浏览器控制台执行

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("新密码"))
  .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,"0")).join("")))
```

```js
USERS["新用户名"] = "上一步得到的哈希值";
```

## 修改文字内容

直接编辑 `index.html` 中各 `.stage-text` 区块：阶段标题、年龄段、引言、正文、"心得"均可改。

## 安全说明（重要）

GitHub Pages 为纯静态托管，无法做服务器端验证。本站密码校验在浏览器端完成（哈希存储），用于"挡住路人、方便亲友"足够；但懂技术的人查看源码后理论上可绕过。请勿放置高度敏感内容。

## 本地预览

直接双击 `index.html`，或：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署

推送 main 分支后自动部署到 GitHub Pages。
