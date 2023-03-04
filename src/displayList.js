var DisplayList=(wrapper,data)=>{
    wrapper.innerHTML="";
    data.items.forEach(item=>{
        displayVideo(wrapper,item);
    });
    applyPagination(pagination_element,data);
}
var displayVideo=async(wrapper,item)=>{
    let videoId=item.id.videoId;
    let stat_url="https://www.googleapis.com/youtube/v3/videos?key="+API+"&id="+videoId+"&part=statistics";
    let statData=await fetchData(stat_url);
    let viewCount=statData.items[0]?statData.items[0].statistics.viewCount:0;
    wrapper.innerHTML+= videoTemplate(item,viewCount);
}

var videoTemplate=(item,viewCount)=>{
    let title=item.snippet.title.slice(0,75);
    let publishedAt=item.snippet.publishedAt.toString().slice(0,10);
    let channelTitle=item.snippet.channelTitle.toUpperCase();
    let description=item.snippet.description.slice(0,200)||"No description given for this video.";
    let videoId=item.id.videoId;
    let videoThumbnail=item.snippet.thumbnails.medium.url;
    return `<div class="video"> 
    <div class="video-thumbnail">
    <img id="image" src="${videoThumbnail}"></img>
    <iframe id="iframe" src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&start=0&controls=0&showinfo=0&modestbranding=0" frameborder="0"></iframe>
    </div> 
    <div class="video-content">
    <a href="https://www.youtube.com/watch?v=${videoId}">
            ${title}
        </a> 
        <p><b>${channelTitle}</b></p>
        <p><b>${viewCount}</b> views  <b>.  <i>${publishedAt}</i></b></p>
        <p><b>Desp:</b>${description}...</p>
    </div> 
</div>`
}
