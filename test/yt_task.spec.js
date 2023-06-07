describe("To test the fetch data from Youtube API",function(){
    let data;
    beforeAll(async function(){
        data = await fetchContent("javascript");
        list_element = 'div#list.list';
        pagination_element = 'div#pagination.pagenumbers';
    });
    it('To check the count of videos based on max screen width',async function(){
        expect(data.items.length).toBe(15);
    });

    it("fetch Data from API using search Text",function(){
        expect(data.items).not.toEqual([]);
        expect(data.items[0].kind).toEqual("youtube#searchResult");
        expect(data.items[0].id.kind).toEqual("youtube#video");
        expect(data.items[14].id.kind).toEqual("youtube#video");
    });

    it("fetch Data from API with nextPageToken",async function(){
        let data1 = await fetchNext(data.nextPageToken);
        if(data1){
            expect(data1.items).not.toEqual([]);
            expect(data1.items[0].id.kind).toEqual("youtube#video");
            expect(data1.items[14].id.kind).toEqual("youtube#video");
        }
    });

    it("To check the changes in page content after clicking next button",()=>{
        spyOn(window,"generateRecords");
        listenNextButton(data);
        expect(currentPage).toEqual(2);
        expect(generateRecords).toHaveBeenCalled();
    });

    it("To check the changes in page content after clicking prev button",()=>{
        spyOn(window,"generateRecords");
        listenPrevButton(data);
        expect(currentPage).toEqual(1);
    });

    it("To check whther the pagination function is called",()=>{
        spyOn(window,"applyPagination");
        DisplayList(list_element,data);
        expect(applyPagination).toHaveBeenCalled();
    });
    

    it("To check if screen changes on fetching data from api",function(){
        spyOn(window,"applyPagination");
        spyOn(window,"displayVideo");
        DisplayList(list_element,data)
        expect(displayVideo).toHaveBeenCalled();
        expect(applyPagination).toHaveBeenCalled();
        expect(list_element.innerHTML).not.toBeNull();
    });
    describe('when window width is 400: ',function(){
        let data2
        beforeAll(async function(){
            window.innerWidth=300;
            maxResults = window.innerWidth <= 600 ? maxResults = 6 : maxResults = 15
            data2=await fetchContent('Php tutorial');
        });
        it('To check the count of videos based on the screen size',async function(){
            expect(data2.items.length).toBe(6);
        });
    });
    
});

describe("To test HTML Elements",function(){
    var fixture=null;
    
    beforeEach(function(){
        fixture='<center>'+
                    '<h1><strong>Youtube</strong> advance search</h1>'+
                    '<form class="header" id="myform">'+
                        '<input type="text" id="search" placeholder="enter search data"  required>'+
                        '<input type="submit" value="Search" id="btn">'+
                    '</form>'+
                '</center>'+
                '<div class="list" id="list"></div>'+
                '<div class="footer">'+
                    '<div class="pagenumbers" id="pagination"></div></div>'+
                '</div>';
        setFixtures(fixture);
        setStyleFixtures('body{background-color:rgba(0,0,0,0.747);color:#fff}strong{color:red}i{margin-right:20px}#search{width:30%}a{text-decoration:none}.list{margin-top:25px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-around;width:100%}.list .video{color:#000;background-color:#FFF;margin:10px 0;width:30%;height:400px}.list .video .video-content{width:100%;padding-left:5px;text-justify:auto}.list .video .video-thumbnail img,.list .video .video-thumbnail iframe{height:180px;width:360px;border-radius:10px;cursor:pointer;margin:10px 5px;border:1px solid #000}.footer{margin-top:20px}.pagenumbers{display:flex;flex-wrap:wrap;align-items:center;margin-left:20%}.pagenumbers button{width:50px;height:50px;appearance:none;border:none;border-radius:10px;outline:none;cursor:pointer;background-color:red;margin:5px;transition:.4s;color:#fff;font-size:18px;box-shadow:0 0 4px rgba(0,0,0,0.2)}.pagenumbers button.active{background-color:#fff;color:red;box-shadow:inset 0 0 4px rgba(0,0,0,0.2)}#btn{color:#fff;background-color:red;border-radius:3px;border:2px solid red}iframe{display:none}img:hover ~ iframe{display:block}img:hover{display:none}@media screen and (max-width:600px){body{font-size:smaller}.list .video{width:100%;height:340px;margin:10px 0}.list .video .video-content{width:400px}.list .video .video-thumbnail img,.list .video .video-thumbnail iframe{height:180px;width:360px;border-radius:10px;cursor:pointer;margin:10px 20px;border:1px solid #000}.pagenumbers{margin-left:0}.pagenumbers button{width:25px;height:25px;font-size:10px;margin:3px}#prev,#next{width:40px}}');
    });
    describe("To test testing dom",function(){
        it("To check whether a form tags present in fixture",function(){
            expect('input[type=text]').toBeInDOM();
            expect('input[type=submit]').toBeInDOM();
            expect('div.list').toBeInDOM();
            expect('.pagenumbers').toBeInDOM();
        });

        
    });
});
