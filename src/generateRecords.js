var generateRecords=async(pageToken)=>{
    let data=await fetchNext(pageToken);
    DisplayList(list_element, data);
}
var fetchNext=(pageToken)=>{
    let searchQuery=document.getElementById('search');
    if(searchQuery){
        let url="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults="
                    +maxResults+"&q="+searchQuery+"&type=video&key="+API+"&pageToken="+pageToken;
        return fetchData(url);
    }
}