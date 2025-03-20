# gewe-node-sdk
微信机器人gewe框架sdk工具包。通过node语言环境实现。通过axios实现封装api接口请求。

## 安装
```bash
npm install gewe-node-sdk
```
## 使用方法
```js
const GeweBot = require('gewe-node-sdk');

async function main() {
    const bot = new GeweBot('你的-app-id', '你的-token');
    const contacts = await bot.getContacts();
    console.log(contacts);
}

main();
```

## 详细功能
```
getContacts() - 获取通讯录列表
getContactsBriefInfo(wxids) - 获取联系人简要信息
getContactsDetailInfo(wxids) - 获取联系人详细信息
getChatroomInfo(chatroomId) - 获取群信息
sendTextMsg(content, toWxid, ats) - 发送文本消息
sendImageMsg(imgUrl, toWxid) - 发送图片消息
······
```

## 发布步骤

```bash
# 1. 初始化 git 仓库（如果尚未完成）
git init
git add .
git commit -m "first commit"

# 2. 登录 npm（如果没有账号，请先在 npmjs.com 注册）
npm login

# 3. 发布到 npm
npm publish --access public

npm notice 
npm notice 📦  gewe-node-sdk@1.0.0
npm notice === Tarball Contents ===
npm notice 1.1kB README.md
npm notice 823B  package.json
npm notice 4.3kB src/core.js
npm notice === Tarball Details ===
npm notice name:          gewe-node-sdk
npm notice version:       1.0.0
npm notice filename:      gewe-node-sdk-1.0.0.tgz
npm notice package size:  2.0 kB
npm notice unpacked size: 6.2 kB
npm notice shasum:        b9db9894e3c5b875734c4612fc1ab699569a0110
npm notice integrity:     sha512-nuB4MEQVx+Hxy[...]bIYzIzxLp4YFg==
npm notice total files:   3
npm notice
npm notice Publishing to https://registry.npmjs.org with tag latest and public access

gewe-node-sdk@1.0.0
```