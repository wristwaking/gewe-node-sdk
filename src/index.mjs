import * as dotenv from 'dotenv';
dotenv.config();

import axios from 'axios'

class GeweBot {
    constructor({ appId = null, token = null, uuid = null } = {}) {
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

    async setCallback(callbackUrlOrOptions) {
        const options = typeof callbackUrlOrOptions === 'string'
            ? { callbackUrl: callbackUrlOrOptions }
            : { ...callbackUrlOrOptions };

        if (!options.callbackUrl) {
            throw new Error('callbackUrl is needed.');
        }

        const data = { token: this.token, callbackUrl: options.callbackUrl };
        return await this.postRequest("/gewe/v2/api/login/setCallback", data);
    }

    async getPersonalProfile({ proxyIp = '' } = {}) {
        const data = { appId: this.appId, proxyIp };
        return await this.postRequest("/gewe/v2/api/personal/getProfile", data);
    }

    async getContactsList() {
        const data = { appId: this.appId };
        return await this.postRequest("/gewe/v2/api/contacts/fetchContactsList", data);
    }

    async getContactsBriefInfo(wxidsOrOptions) {
        const options = typeof wxidsOrOptions === 'string' || Array.isArray(wxidsOrOptions)
            ? { wxids: wxidsOrOptions }
            : { ...wxidsOrOptions };

        if (!options.wxids) {
            throw new Error('wxids is needed.');
        }

        const data = { appId: this.appId, wxids: options.wxids };
        return await this.postRequest("/gewe/v2/api/contacts/getBriefInfo", data);
    }

    async getContactsDetailInfo(wxidsOrOptions) {
        const options = typeof wxidsOrOptions === 'string' || Array.isArray(wxidsOrOptions)
            ? { wxids: wxidsOrOptions }
            : { ...wxidsOrOptions };

        if (!options.wxids) {
            throw new Error('wxids is needed.');
        }

        const data = { appId: this.appId, wxids: options.wxids };
        return await this.postRequest("/gewe/v2/api/contacts/getDetailInfo", data);
    }

    async getChatroomInfo(chatroomIdOrOptions) {
        const options = typeof chatroomIdOrOptions === 'string'
            ? { chatroomId: chatroomIdOrOptions }
            : { ...chatroomIdOrOptions };

        if (!options.chatroomId) {
            throw new Error('chatroomId is needed.');
        }

        const data = { appId: this.appId, chatroomId: options.chatroomId };
        return await this.postRequest("/gewe/v2/api/group/getChatroomInfo", data);
    }

    async sendTextMessage(toWxidOrOptions, content = '', ats = null) {
        let options = {};
        if (typeof toWxidOrOptions === 'string') {
            options = { toWxid: toWxidOrOptions, content, ats };
        } else if (typeof toWxidOrOptions === 'object' && toWxidOrOptions !== null) {
            options = { content, ats, ...toWxidOrOptions };
        } else {
            throw new Error('toWxid is needed.');
        }

        if (!options.toWxid) {
            throw new Error('toWxid is needed.');
        }

        const data = {
            appId: this.appId,
            toWxid: options.toWxid,
            content: options.content,
            ...(options.ats && { ats: options.ats })
        };
        return await this.postRequest("/gewe/v2/api/message/postText", data);
    }

    async sendImageMessage(toWxidOrOptions, imgUrl = '') {
        const options = typeof toWxidOrOptions === 'string'
            ? { toWxid: toWxidOrOptions, imgUrl }
            : { imgUrl, ...toWxidOrOptions };

        if (!options.toWxid) {
            throw new Error('toWxid is needed.');
        }

        const data = { appId: this.appId, toWxid: options.toWxid, imgUrl: options.imgUrl };
        return await this.postRequest("/gewe/v2/api/message/postImage", data);
    }

    async sendLinkMessage(toWxidOrOptions, imgUrl = '', title = '', desc = '', linkUrl = '', thumbUrl = '') {
        const options = typeof toWxidOrOptions === 'string'
            ? { toWxid: toWxidOrOptions, imgUrl, title, desc, linkUrl, thumbUrl }
            : { imgUrl, title, desc, linkUrl, thumbUrl, ...toWxidOrOptions };

        if (!options.toWxid) {
            throw new Error('toWxid is needed.');
        }

        const data = {
            appId: this.appId,
            toWxid: options.toWxid,
            title: options.title,
            desc: options.desc,
            linkUrl: options.linkUrl,
            thumbUrl: options.thumbUrl
        };
        return await this.postRequest("/gewe/v2/api/message/postLink", data);
    }

    async sendNameCardMessage(toWxidOrOptions, nickName = '', nameCardWxid = '') {
        const options = typeof toWxidOrOptions === 'string'
            ? { toWxid: toWxidOrOptions, nickName, nameCardWxid }
            : { nickName, nameCardWxid, ...toWxidOrOptions };

        if (!options.toWxid) {
            throw new Error('toWxid is needed.');
        }

        const data = {
            appId: this.appId,
            toWxid: options.toWxid,
            nickName: options.nickName,
            nameCardWxid: options.nameCardWxid
        };
        return await this.postRequest("/gewe/v2/api/message/postNameCard", data);
    }

    async sendMiniAppMessage(toWxidOrOptions, miniAppId, userName, title, coverImgUrl, pagePath, displayName) {
        const options = typeof toWxidOrOptions === 'string'
            ? { toWxid: toWxidOrOptions, miniAppId, userName, title, coverImgUrl, pagePath, displayName }
            : { miniAppId, userName, title, coverImgUrl, pagePath, displayName, ...toWxidOrOptions };

        if (!options.toWxid) {
            throw new Error('toWxid is needed.');
        }

        const data = {
            appId: this.appId,
            toWxid: options.toWxid,
            miniAppId: options.miniAppId,
            userName: options.userName,
            title: options.title,
            coverImgUrl: options.coverImgUrl,
            pagePath: options.pagePath,
            displayName: options.displayName
        };

        return await this.postRequest("/gewe/v2/api/message/postMiniApp", data);
    }

    async downloadImage(options = {}) {
        const { xml } = options;
        if (!xml) {
            throw new Error('XML data is required.');
        }
    
        const data = {
            appId: this.appId,
            type: 2,
            xml: xml
        };
    
        return await this.postRequest("/gewe/v2/api/message/downloadImage", data);
    }

    async getClassroomMemberList(classroomIdOrOptions) {
        const options = typeof classroomIdOrOptions === 'string'
            ? { chatroomId: classroomIdOrOptions }
            : { ...classroomIdOrOptions };

        if (!options.chatroomId) {
            throw new Error('chatroomId is needed.');
        }

        const data = { appId: this.appId, chatroomId: options.chatroomId };
        return await this.postRequest("/gewe/v2/api/group/getChatroomMemberList", data);
    }

    async searchContacts(contactsInfoOrOptions) {
        const options = typeof contactsInfoOrOptions === 'string'
            ? { contactsInfo: contactsInfoOrOptions }
            : { ...contactsInfoOrOptions };

        if (!options.contactsInfo) {
            throw new Error('contactsInfo is needed.');
        }

        const data = { appId: this.appId, contactsInfo: options.contactsInfo };
        return await this.postRequest("/gewe/v2/api/contacts/search", data);
    }

    async addContacts({ scene = 3, content = '', v3 = '', v4 = '', option = 2 } = {}) {
        if (!content) {
            throw new Error('content is needed.');
        }

        const data = { appId: this.appId, scene, content, v3, v4, option };
        return await this.postRequest("/gewe/v2/api/contacts/addContacts", data);
    }

    async agreeJoinClassroom(urlOrOptions) {
        const options = typeof urlOrOptions === 'string'
            ? { url: urlOrOptions }
            : { ...urlOrOptions };

        if (!options.url) {
            throw new Error('url is needed.');
        }

        const data = { appId: this.appId, url: options.url };
        return await this.postRequest("/gewe/v2/api/group/agreeJoinRoom", data);
    }
}

export default GeweBot;