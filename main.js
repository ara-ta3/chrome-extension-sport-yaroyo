(function() {
    var isLogin = function(html) {
        var lists = html.querySelectorAll("#navi-in > li > a");
        return lists.length > 1 
            && lists[0].innerText === "ログアウト";
    };

    var countNotification = function(html) {
        return 0;
    };

    var promptLogin = function() {

    };

    var sendRequest = function() {
        var xhr = new XMLHttpRequest();
        xhr.onload = function( ) {
            var html = xhr.responseXML;
            var login = isLogin(html);

            console.log(login);
            if(login) {
                var c = countNotification(html);
                console.log(chrome);
            } else {
                promptLogin();
            }
        }

        var url = 'http://www.net-menber.com/';
        xhr.open('GET', url, true);
        xhr.responseType = "document";
        xhr.send();
    };
    chrome.runtime.onMessage.addListener(
        function(req, sender, sendResponse) {
            return sendRequest();
        }
    );
})();
