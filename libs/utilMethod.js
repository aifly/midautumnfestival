/**
 created by fly on 2016/4/11 0011
 */
const utilMethods = {
    getGuid(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    r(m, n) {
        return (m + Math.random() * (n - m));
    },
    loading(arr, fn, fnEnd){
        var len = arr.length;
        var count = 0;
        var i = 0;
        loadimg();
        function loadimg() {
            if (i === len) {
                return;
            }
            var img = new Image();
            img.onload = img.onerror = ()=> {
                count++;
                if (i < len - 1) {
                    i++;
                    loadimg();
                    fn && fn(i / (len - 1), img.src);
                } else {
                    fnEnd && fnEnd(img.src);
                }
                img = null;
            };
            img.src = arr[i];
        }
    },
    getQueryString(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
   
}

if (!Array.from) {
    Array.from = (c)=> {
        return Array.prototype.slice.call(c);
    }
}

let _$ = (selector)=> {
    return document.querySelector(selector);
};
let $$ = (selector, parent)=> {
    parent = parent || document;
    return [].slice.call(parent.querySelectorAll(selector));
};


export default {utilMethods, _$, $$};