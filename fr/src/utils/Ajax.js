export default function ajaxRequest(url, data, callback, method) {
    let header = {
        method: method,
        body: data
    };

    console.log(header);

    fetch(url, header).then((response) => {
        response.json().then((json) => {
            callback(JSON.parse(json));
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}