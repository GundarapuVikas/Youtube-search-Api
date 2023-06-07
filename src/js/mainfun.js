
var main = async (searchQuery) => {
    let data = await fetchContent(searchQuery);
    DisplayList(list_element, data);
}

var fetchContent = (searchQuery) => {
    let url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=" + maxResults + "&q=" + searchQuery + "&type=video&key=" + API;
    return fetchData(url);
}


var fetchData = (url) => {
    return fetch(url)
        .then((result) => {
            return result.json()
        }).then((data) => {
            return data;
        });
}



