
var stringUtil = {}
//是否包含
 stringUtil.isContains=(str, substr) => {
    return str.indexOf(substr) >= 0
}

//对日期进行处理
stringUtil.Format = (date,fmt) => { //author: meizz 
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o){
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt
}
//js中用正则表达式 过滤特殊字符, 校验所有输入域是否含有特殊符号
//处理特殊字符  正则校验
//只能输入汉字
stringUtil.only_chinese = "^[\u4e00-\u9fa5]{0,}$"
//url校验
stringUtil.url_check = "^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$"
//tel校验
stringUtil.tel_check = "^(\d{3,4}-)\d{7,8}$"
//匹配首尾空格
stringUtil.blank_check="(^\s*)|(\s*$)"

stringUtil.trims = function(ctx)
{
return ctx.replace(/(^\s*)|(\s*$)/g, "")
}
//特殊字符窜（验证是否含有^%&',;=?$"等字符）
stringUtil.special_check="[^%&',;=?$]+"
//匹配首尾空白字符(可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)
stringUtil.First_last = "^\s*|\s*$"


 module.exports = stringUtil