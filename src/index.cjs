require('dotenv').config();
const axios = require('axios');

class GeweBot {
    constructor(appId = null, token = null, uuid = null) {
        this.appId = appId || process.env.appId;
        this.token = token || process.env.token;
        this.baseUrl = "http://api.geweapi.com";
    }

    getHeaders() {
        return {
            'X-GEWE-TOKEN': this.token,
            'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
            'Content-Type': 'application/json'
        };
    }

    async postRequest(url, data) {
        return new Promise((resolve, reject) => {
            axios.post(`${this.baseUrl}${url}`, data, {
                headers: this.getHeaders()
            }).then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }

    setToken(token) {
        this.token = token;
    }

    setAppId(appId) {
        this.appId = appId;
    }

    async setCallback(callbackUrl) {
        const data = { token: this.token, callbackUrl: callbackUrl };
        return await this.postRequest("/gewe/v2/api/login/setCallback", data);
    }

    async getPersonalProfile(proxyIp = "") {
        const data = { appId: this.appId, proxyIp: proxyIp };
        return await this.postRequest("/gewe/v2/api/personal/getProfile", data);
    }

    async getContactsList() {
        const data = { appId: this.appId };
        return await this.postRequest("/gewe/v2/api/contacts/fetchContactsList", data);
    }

    async getContactsBriefInfo(wxids) {
        const data = {
            appId: this.appId,
            wxids: wxids
        };
        return await this.postRequest("/gewe/v2/api/contacts/getBriefInfo", data);
    }

    async getContactsDetailInfo(wxids) {
        const data = {
            appId: this.appId,
            wxids: wxids
        };
        return await this.postRequest("/gewe/v2/api/contacts/getDetailInfo", data);
    }

    async getChatroomInfo(chatroomId) {
        const data = {
            appId: this.appId,
            chatroomId: chatroomId
        };
        return await this.postRequest("/gewe/v2/api/group/getChatroomInfo", data);
    }

    async sendTextMessage(toWxid, content, ats = null) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            content: content,
            ...(ats && { ats: ats })
        };
        return await this.postRequest("/gewe/v2/api/message/postText", data);
    }

    async sendImageMessage(toWxid, imgUrl) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            imgUrl: imgUrl
        };
        return await this.postRequest("/gewe/v2/api/message/postImage", data);
    }

    async sendLinkMessage(toWxid, imgUrl, title, desc, linkUrl, thumbUrl) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            title: "",
            desc: "",
            linkUrl: "",
            thumbUrl: ""
        }
        return await this.postRequest("/gewe/v2/api/message/postLink", data);
    }

    async sendNameCardMessage(toWxid, nickName, nameCardWxid) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            nickName: nickName,
            nameCardWxid, nameCardWxid
        }
        return await this.postRequest("/gewe/v2/api/message/postNameCard", data);
    }

    async getClassroomMemberList(classroomId) {
        const data = {
            appId: this.appId,
            chatroomId: classroomId
        };
        return await this.postRequest("/gewe/v2/api/group/getChatroomMemberList", data);
    }

    async searchContacts(contactsInfo) {
        const data = {
            appId: this.appId,
            contactsInfo: contactsInfo
        };
        return await this.postRequest("/gewe/v2/api/contacts/search", data);
    }

    async addContacts(scene = 3, content, v3, v4, option = 2) {
        const data = {
            appId: this.appId,
            scene: scene,
            content: content,
            v3: v3,
            v4: v4,
            option: option
        };
        return await this.postRequest("/gewe/v2/api/contacts/addContacts", data);
    }

    async agreeJoinClassroom(url) {
        const data = {
            appId: this.appId,
            url: url
        };
        return await this.postRequest("/gewe/v2/api/group/agreeJoinRoom", data);
    }
}


module.exports = GeweBot;