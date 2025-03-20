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
```