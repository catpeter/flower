/* eslint-disable */
export default {
    install(Vue) {
        Vue.prototype.getcookie = function(name) {
            var arr = document.cookie
                .match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null)
                return unescape(arr[2]);
            return null;
        }
        Vue.prototype.savecookie = function(name, value, days) {
            var dat = new Date();
            dat.setTime(dat.getTime() + days * 24 * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";path=/;expires=" +
                dat.toGMTString();
        }
        Vue.prototype.delCookie = function(name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = getCookie(name);
                if (cval != null)
                    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        //自定义全局常量
        Vue.prototype.requetHost = "http://192.168.64.110:8086/";
    }
}