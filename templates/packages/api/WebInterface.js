export default class WebInterface {
    Get(url) {
        let response;
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, false);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                response = JSON.parse(xhr.responseText);
            }
        };

        xhr.send();

        return response;
    }
}
