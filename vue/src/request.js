import axios from "axios"
import localforage from 'localforage'
import { setup } from 'axios-cache-adapter'
import config from "@/config.js"


const localstore = localforage.createInstance({
    // List of drivers used
    driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
    ],
    name: 'page-cache'
});

export default class Request {

    static removeFromCache(url) {
        localstore.removeItem(url)
    }

    static clearCache() {
        localstore.clear()
    }

    static buildUrl(url) {
        if (!(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//'))) {
            url = config.apiUrl + url
        }
        return url
    }

    static post(url, {dataObj = null, callback = null, failedCallback = null} = {}) {
        function buildFormdata() {
            const form = new FormData()
            for (const key in dataObj) {
                form.append(key, dataObj[key]);
            }
            return form
        }

        let reqPromise = axios.post(Request.buildUrl(url), buildFormdata())

        reqPromise.then(function (response) {
            if (callback) {
                callback(response.data);
            }
        }).catch(function (error) {
            if (failedCallback) {
                failedCallback(error);
            }
        })

        return reqPromise
    }

    static get(url, {
        dataObj = null,
        callback = null,
        failedCallback = null,
        cached = false,
        clearCache = false,
        //                  milli  sec  min  Std Tage
        cacheTime = 1000 * 60 * 60 * 24 * 1
    } = {}) {
        let api = axios
        if (cached) {
            api = setup({
                cache: {
                    maxAge: cacheTime,
                    store: localstore,
                    exclude: {
                        query: false
                    },
                    //remove cacheItems on reload
                    invalidate: async (config, request) => {
                        if (request.clearCache) {
                            await config.store.removeItem(config.uuid)
                        }
                    }
                }
            })
        }

        let reqPromise = api.get(Request.buildUrl(url), {params: dataObj, clearCache: clearCache})
        reqPromise.then(function (response) {
            if (callback) {
                callback(response.data);
            }
        }).catch(function (error) {
            if (failedCallback) {
                failedCallback(error);
            }
        })
        return reqPromise

    }
}