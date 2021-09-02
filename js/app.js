document.getElementById('error-message').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';

       // Handle empty search request
    if (searchText ==='') {
        displayError();
        const loadBooks= document.getElementById("search-result");
        loadBooks.textContent='';
        document.getElementById('book-numbers').style.display = 'none';
    }
    
    //  fetching data from url 
    else{
    const url = `http://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data))
        document.getElementById('error-message').style.display = 'none';
    }
}
    //    error function
const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    
}
//  getting search result
const displaySearchResult = books => {
    console.log(books); 
    const loadBooks= document.getElementById("search-result");
    //  clear previous page 
    loadBooks.textContent='';
    const bookList = books.docs;
    //  show error if there is no book found 
    if(bookList.length===0){
        document.getElementById('book-numbers').style.display = 'none';
        displayError();
    }
    else{
            //  showing numbers of book

        document.getElementById('book-numbers').style.display = 'block';
        document.getElementById('book-numbers').innerText =`Books Found ${bookList.length}`;
    }
    bookList.forEach(element => {
       const loadBooks= document.getElementById("search-result");
       
       const books = bookList.indexOf(element);

    //    create div to show search result 

       const div = document.createElement('div');
       div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top w-50 h-50 mx-auto" alt="">
            <div class="card-body overflow-auto" style="height: 200px">
                <h3 class="card-title text-primary">Book Name: ${element.title}</h3>
                <h5 class="card-title text-secondary">Book Writer: ${element.author_name}</h5>
                <h5 class="card-title text-secondary ">Book Publisher: ${element.publisher}</h5>
                <h5 class="card-title text-secondary">First Publishing Date: ${element.first_publish_year}</h5>
            </div>
            <div class="card-footer">
                <small class="text-muted">Last updated 3 mins ago</small>
            </div>
            </div>
    `;
    loadBooks.appendChild(div);

    });

}