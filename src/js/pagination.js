var currentPage=1;
var createPrevButton=(data)=>{
    let prevBtn=document.createElement('button');
    prevBtn.innerText="Prev";
    prevBtn.id="prev"; 
    prevBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        listenPrevButton(data)
    });
    return prevBtn;
}

var listenPrevButton=(data)=>{
    if(currentPage>=2){
        currentPage-=1;
        generateRecords(data.prevPageToken);
    }
}

var createNextButton=(data)=>{
    let nextBtn=document.createElement('button');
    nextBtn.innerText="Next";
    nextBtn.id="next";
    nextBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        listenNextButton(data)
    });
    return nextBtn;
}

var listenNextButton=(data)=>{
    currentPage+=1;
    generateRecords(data.nextPageToken);
}


var paginationButton=(page,data)=>{
    let button=document.createElement('button');
    button.innerText=page;
    if(currentPage==page){
        button.classList.add('active');
    }
    button.addEventListener('click',function(){
        currentPage=page;
        generateRecords(data.nextPageToken);
        let current_btn=document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}

var applyPagination=(wrapper,data)=>{
    if(wrapper){
        wrapper.innerHTML="";
    }
    let prevBtn=createPrevButton(data);
    wrapper.appendChild(prevBtn);
    for(let i=1;i<=10;i++){
        let btn=paginationButton(i,data);
        wrapper.appendChild(btn);
    }
    let nextBtn=createNextButton(data);
    wrapper.appendChild(nextBtn);
}

