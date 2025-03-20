const axios = require('axios');
require('dotenv').config();

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
        try {
            const response = await axios.post(`${this.baseUrl}${url}`, data, {
                headers: this.getHeaders()
            });

            if (response.data.ret === 200) {
                return response.data.data || response.data.msg;
            } else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    setToken(token) {
        this.token = token;
    }

    setAppId(appId) {
        this.appId = appId;
    }

    async getContacts() {
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

    async sendTextMsg(toWxid, content, ats = null) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            content: content,
            ...(ats && { ats: ats })
        };
        return await this.postRequest("/gewe/v2/api/message/postText", data);
    }

    async sendImageMsg(toWxid, imgUrl) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            imgUrl: imgUrl
        };
        return await this.postRequest("/gewe/v2/api/message/postImage", data);
    }

    async sendLinkMsg(toWxid, imgUrl, title, desc, linkUrl, thumbUrl) {
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

    async sendNameCardMsg(toWxid, nickName, nameCardWxid) {
        const data = {
            appId: this.appId,
            toWxid: toWxid,
            nickName: nickName,
            nameCardWxid, nameCardWxid
        }
        return await this.postRequest("/gewe/v2/api/message/postNameCard", data);
    }

    async getClassroomMembers(classroomId) {
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