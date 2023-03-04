var form = document.getElementById("myform");
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let searchQuery = document.getElementById("search").value;
        main(searchQuery);
    })
}
