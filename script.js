const title=document.querySelector("#title");
const author=document.querySelector("#author");
const pages=document.querySelector("#pages");
const hasRead=document.getElementsByName("read");
const display_books_container=document.querySelector(".display-books-container");



//array to store book objects
let myLibrary=[];

// function Book(title,author,pages,hasRead){
//     this.title=title;
//     this.author=author;
//     this.pages=pages;
//     this.hasRead=hasRead;
//     this.info=function(){
//         return `${this.title} by ${this.author}, pages ${this.pages}, read ${this.hasRead}`;
//     }
// }

class Book{
    constructor(title,author,pages,hasRead){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.hasRead=hasRead;
    }
    info(){
        return `${this.title} by ${this.author}`
    }
}

function addBookToLibrary(title,author,pages,hasRead){
    let newBook=new Book(title,author,pages,hasRead);
    myLibrary.push(newBook);
}


// display books 
function displayBooks(){
    
    resetBooks();

    for(let i=0;i<myLibrary.length;i++){

        const book_card=document.createElement("div");
        const title_p=document.createElement("p");
        const author_p=document.createElement("p");
        const pages_p=document.createElement("p");
        const hasRead_p=document.createElement("p");
        const deleteCardDiv=document.createElement("div");
        const deleteCardButton=document.createElement("button");
        

        title_p.innerText="Title: "+myLibrary[i].title
        author_p.innerText="Author: "+myLibrary[i].author
        pages_p.innerText="Pages: "+myLibrary[i].pages
        hasRead_p.innerText="You have "+myLibrary[i].hasRead+" it."
        deleteCardButton.innerText="❌";

        title_p.classList.add("title_p");
        deleteCardDiv.classList.add("delete-button-div");
        deleteCardButton.classList.add("delete-button");
        deleteCardButton.setAttribute("title","This will delete the card");
        book_card.classList.add("book-card");
        deleteCardButton.setAttribute("id",`${i}`)

        book_card.appendChild(deleteCardDiv);
        deleteCardDiv.appendChild(deleteCardButton);
        book_card.appendChild(title_p);
        book_card.appendChild(author_p);
        book_card.appendChild(pages_p);
        book_card.appendChild(hasRead_p);
        display_books_container.appendChild(book_card);

        deleteCardButton.addEventListener("click",(e)=>{
            myLibrary.splice(e.target.id,1);
            displayBooks();
        })
    }
}
// add book button
const add_book_button=document.querySelector(".add_book_button");

const card=document.querySelector(".card");

add_book_button.addEventListener("click",toggleDisplayCard);

function toggleDisplayCard(){
    card.classList.toggle("card-visibility");
}

// form submit action

const form_submit_button=document.querySelector(".form_submit_button");

form_submit_button.addEventListener("click",()=>{
    if(title.value!=""){
        let hasReadValue=(hasRead[0].checked)?hasRead[0].value:hasRead[1].value;
        addBookToLibrary(title.value,author.value,pages.value,hasReadValue);
        displayBooks();
        toggleDisplayCard();
        clearform();
    }
});

// remove all books 
function resetBooks(){
    display_books_container.textContent="";
}

function clearform(){
    title.value="";
    author.value="";
    pages.value="";
}

