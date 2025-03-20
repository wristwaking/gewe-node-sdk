# gewe-node-sdk
微信机器人gewe框架sdk工具包。通过node语言环境实现。通过axios实现封装api接口请求。

## 安装
```bash
npm install gewe-node-sdk
```

## 读取环境变量
```
appId: xxx
token: xxx
```

## 使用方法
commonjs 模式
```js
const GeweBot = require('gewe-node-sdk');

async function main() {
    const bot = new GeweBot('你的-app-id', '你的-token');
    const contacts = await bot.getContactsList();
    console.log(contacts);
}

main();
```
modulejs 模式
```js
import GeweBot from 'gewe-node-sdk';

async function main() {
    const bot = new GeweBot('你的-app-id', '你的-token');
    const contacts = await bot.getContactsList();
    console.log(contacts);
}

main();
```
配置 package.json
```json
{
    "type": "module",
}
```

## GeweBot 文档


| 函数名称 | 描述 |
|----------|------|
| `constructor(appId = null, token = null, uuid = null)` | 初始化 GeweBot，使用 appId（默认取环境变量）、token（默认取环境变量）和未使用的 uuid |
| `setToken(token)` | 设置 API 请求的认证令牌 |
| `setAppId(appId)` | 设置 API 请求的应用 ID |
| `setCallback(callbackUrl)` | 设置登录操作回调 URL |
| `getPersonalProfile()` | 获取当前用户个人资料信息 |
| `getContactsList()` | 获取完整的联系人列表 |
| `getContactsBriefInfo(wxids)` | 获取指定联系人 ID 简要信息 |
| `getContactsDetailInfo(wxids)` | 获取指定联系人 ID 详细信息 |
| `getChatroomInfo(chatroomId)` | 获取指定微信群的信息 |
| `sendTextMessage(toWxid, content, ats = null)` | 向指定联系人发送文本消息：可选包含 @ |
| `sendImageMessage(toWxid, imgUrl)` | 向指定联系人发送图片消息 |
| `sendLinkMessage(toWxid, imgUrl, title, desc, linkUrl, thumbUrl)` | 向指定联系人发送带缩略图的链接消息 |
| `sendNameCardMessage(toWxid, nickName, nameCardWxid)` | 向指定联系人发送名片消息 |
| `getClassroomMemberList(classroomId)` | 获取指定微信群的成员列表 |
| `searchContacts(contactsInfo)` | 根据提供的条件搜索联系人 |
| `addContacts(scene = 3, content, v3, v4, option = 2)` | 添加新联系人：包括场景、验证内容、v3/v4 字段和添加选项 |
| `agreeJoinClassroom(url)` | 通过邀请 URL 同意加入聊天室 |

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