document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value='';

    document.getElementById('spinner').style.display = 'block';
       // Handle empty search request and sppiner
    if (searchText ==='') {
        displayError();
        const loadBooks= document.getElementById("search-result");
        loadBooks.textContent='';
        document.getElementById('book-numbers').style.display = 'none';
        document.getElementById('spinner').style.display = 'none';
    }
    
    //  fetching data from url 
    else{
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
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
    //stop  sppiner after getting result
    document.getElementById('spinner').style.display = 'none';
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

    //    create div to show search result 

        const div = document.createElement('div');
        div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg" class="card-img-top w-50 h-50 mx-auto" alt="">
            <div class="card-body overflow-auto" style="height: 200px">
                <h3 class="card-title text-primary text-center">Book Name: ${element.title}</h3>
                <h5 class="card-title text-secondary text-center">Book Writer: ${element.author_name}</h5>
                <h5 class="card-title text-secondary text-center ">Book Publisher: ${element.publisher}</h5>
                <h5 class="card-title text-secondary text-center">First Publishing Date: ${element.first_publish_year}</h5>
            </div>
            </div>
    `;
    loadBooks.appendChild(div);

    });

}