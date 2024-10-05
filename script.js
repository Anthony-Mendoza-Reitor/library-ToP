/* This will include the logic for the library*/

/* This is to make code look cleaner */
const addBook = document.querySelector('#addBook');
const dialog = document.querySelector('#myDialog');
const closeDialog = document.querySelector('.closeForm');
const resetForm = document.querySelector('#resetForm');
const bookTitle = document.querySelector('#bookTitle');
const bookAuthor = document.querySelector('#bookAuthor');
const bookPages = document.querySelector('#bookPages');
const bookYear = document.querySelector('#bookYear');
const bookStatus = document.querySelector('#bookStatus');
const bookCounter = document.querySelector('#bookCounter');
const submitForm = document.querySelector('#submitForm');
const form = document.querySelector('#formDialog');
const gridContent = document.querySelector('.gridBooks')

//Opens the dialog form to add new book info
addBook.addEventListener('click', ()=>{
    dialog.showModal();
})
//Closes the dialog form
closeDialog.addEventListener('click', ()=>{
    dialog.close();
})
//Reset the Form fields
resetForm.addEventListener('click', ()=>{
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookYear.value = '';
    bookStatus.checked = ''; 
})
// Class Constructor function
function Book(title, author, pages, year, status){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.status = status;
}
//Array to store the Books
const myBooks = [];

//Lenght of the Array
bookCounter.textContent = myBooks.length;

//Calls the function to add books to library
addBooktoArray();

// This functions gathers data from the form
function getFormValues(){
    let title = bookTitle.value;
    let author = bookAuthor.value;
    let pages = bookPages.value;
    let year = bookYear.value;
    let status = bookStatus.checked;

    if (myBooks.some(book => book.title === title && book.author === author)){
        errorDialog.showModal()
        setTimeout(()=>{
            errorDialog.close()
        }, 700)
        return;
    }
    let book = new Book(title, author, pages, year, status);
    myBooks.push(book);
}

//Event listener to Submit data from form when clicked
submitForm.addEventListener('click',(e)=>{
    e.preventDefault();
    if(form.checkValidity()){
        getFormValues();
        addBooktoArray();
        
        //Clears form after submitting the values
        bookTitle.value = '';
        bookAuthor.value = '';
        bookPages.value = '';
        bookYear.value = '';
        bookStatus.checked = '';
        dialog.close();

    }else{
        form.reportValidity()
    }
    bookCounter.textContent = myBooks.length;
})

//This function will populate the Gridbooks Div
function addBooktoArray(){
    gridContent.innerHTML = ''
    for(let book of myBooks){
        const div = document.createElement('div');
        div.classList.add('book')

        const title = document.createElement('h2');
        title.textContent = `Title : ${book.title}`
    
        const author = document.createElement('h4');
        author.textContent = `Author : ${book.author}`
    
        const pages = document.createElement('p');
        pages.textContent = `Pages : ${book.pages}`

        const year = document.createElement('p');
        year.textContent = `Year : ${book.year}`
    
        const status = document.createElement('p')
        status.textContent = `Status : ${book.status ? 'Read' : 'Not read'}`
        
        const statusButton = document.createElement('button');
        statusButton.classList.add('statusBtn')
        statusButton.textContent = 'Change status'

        statusButton.addEventListener('click', ()=>{
            book.status = !book.status;
            statusButton.textContent = 'Change status'
            status.textContent = `Status : ${book.status ? 'Read' : "Haven't read"}`
        })

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete'
        deleteButton.addEventListener('click', ()=>{
            let indexToBeDeleted = myBooks.indexOf(book);
            myBooks.splice(indexToBeDeleted, 1);
            addBooktoArray();
           

            bookCounter.textContent = myBooks.length;
            
        })
    
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(year);
        div.appendChild(status);
        div.appendChild(statusButton);
        div.appendChild(deleteButton);
    
        gridContent.appendChild(div)        
    }
}