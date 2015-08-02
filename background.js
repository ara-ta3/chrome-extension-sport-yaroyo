(function() {
    var App = function() {

        var isLogin = function(html) {
            var lists = html.querySelectorAll("#navi-in > li > a");
            return lists.length > 1 
                && lists[0].innerText === "ログアウト";
        };

        var countNotification = function(html) {
            var countDom = html.querySelector("#navi-in > li > a > span.midoku");
            return countDom ? countDom.innerText : 0;
        };

        var promptLogin = function() {

        };

        this.sendRequest = function() {
            if(this.cache === undefined) {
                this.cache = {};
            }
            var expire = "expire" in this.cache ? this.cache.expire : false;
            var cacheVal = "value" in this.cache ? this.cache.value : false;
            var now = new Date().getTime();
            if( expire && now <= expire && cacheVal) {
                return setText(cacheVal);
            }

            var xhr = new XMLHttpRequest();
            xhr.onload = function( ) {
                var html = xhr.responseXML;
                var login = isLogin(html);
                if(login) {
                    var c = countNotification(html);
                    setText(c.toString());
                    setCache(c.toString());
                } else {
                    promptLogin();
                }
            }

            var url = 'http://www.net-menber.com/';
            xhr.open('GET', url, true);
            xhr.responseType = "document";
            xhr.send();
        };

        var setCache = function(text) {
            // 日付をまたぐ場合など考慮していない
            var now = new Date();
            var hour = now.getHours();
            now.setHours(hour + 1);
            var newExpire = now.getTime();
            this.cache = {
                expire: newExpire,
                value: text
            };
        };
        var setText = function(text) {
            chrome.browserAction.setBadgeText({"text":text});
        }

        this.clearCache = function() {
            this.cache = {};
        };

    };
    var app = new App();
    chrome.browserAction.onClicked.addListener(function() {
        app.clearCache();
        var url = 'http://www.net-menber.com/';
        chrome.tabs.create({ url: url });
    });
    chrome.tabs.onSelectionChanged.addListener(app.sendRequest);
})();
