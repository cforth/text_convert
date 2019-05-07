function Base64() {

    // private property
    _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
    this.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }

    // public method for decoding
    this.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    _utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    _utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}

KEYSTR = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

DONGBEILIST = ["抠，", "嘎，", "黑，", "皮，", "骚，", "帮，", "胖，", "民，", 
               "上，", "整，", "揍，", "弄，", "歪，", "瞒，", "脍，", "二，", 
               "呛，", "银，", "贫，", "嗯呐", "咋地", "噶哈", "鼓捣", "撂下",
                "嘘呼", "倒嚼", "开壶", "昨个", "一码", "扒瞎", "悬乎", "茅楼", 
                "邪呼", "晃常", "反群", "连裆", "喀拉", "盯吧", "坐地", "白扯", 
                "鸡尖", "噶答", "人家", "瘪子", "立马", "隔叽", "扯蛋", "开腚", 
                "走道", "糨子", "自个", "约么", "磨叽", "拉巴", "上货", "得瑟", 
                "刺挠", "诡道", "带劲", "够戗", "旮旯", "嚼兴", "糗了", "稀罕", "吧！"];

function dongbei_encode() {
    var string = document.getElementById("originalText").value;
    var b = new Base64();
    var str = b.encode(string);
    var dongbeiStrList = [];
    for (i=0; i < 65; i++) {
        index = KEYSTR.indexOf(str[i]);
        dongbeiStrList.push(DONGBEILIST[index]);
    }
    var dongbeiStr = dongbeiStrList.join("");
    document.getElementById("result").innerHTML = dongbeiStr;
}

function dongbei_decode() {
    var dongbeiStr = document.getElementById("originalText").value;
    var dongbeiStrList = [];
    var string = "";
    for (i=0; i < dongbeiStr.length; i=i+2) {
        dongbeiStrList.push(dongbeiStr[i] + dongbeiStr[i+1]);
    }
    for (i=0; i < dongbeiStrList.length; i++) {
        index = DONGBEILIST.indexOf(dongbeiStrList[i]);
        string += KEYSTR[index];
    }
    var b = new Base64();
    var str = b.decode(string);
    document.getElementById("result").innerHTML = str;
}