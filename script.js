const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const hasRead = document.getElementsByName("read");
const display_books_container = document.querySelector(
  ".display-books-container"
);

const titleError = document.querySelector("#titleError");
const authorError = document.querySelector("#authorError");
const pagesError = document.querySelector("#pagesError");

//array to store book objects
let myLibrary = [];

//retrieve local storage books
const retrievedUserBooks=JSON.parse(localStorage.getItem("UserBooks"));
if(retrievedUserBooks){
  retrievedUserBooks.forEach(book => {
    myLibrary.push(book);
  });
  displayBooks();
}


//
const transitionInterval = 400;
// function Book(title,author,pages,hasRead){
//     this.title=title;
//     this.author=author;
//     this.pages=pages;
//     this.hasRead=hasRead;
//     this.info=function(){
//         return `${this.title} by ${this.author}, pages ${this.pages}, read ${this.hasRead}`;
//     }
// }

class Book {
  constructor(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
  }
  info() {
    return `${this.title} by ${this.author}`;
  }
}

function addBookToLibrary(title, author, pages, hasRead) {
  let newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  localStorage.setItem("UserBooks", JSON.stringify(myLibrary));
}

// display books
function displayBooks() {
  resetBooks();

  for (let i = 0; i < myLibrary.length; i++) {
    const book_card = document.createElement("div");
    const title_p = document.createElement("p");
    const author_p = document.createElement("p");
    const pages_p = document.createElement("p");
    const hasRead_p = document.createElement("p");
    const deleteCardDiv = document.createElement("div");
    const deleteCardButton = document.createElement("button");

    title_p.innerText = "Title: " + myLibrary[i].title;
    author_p.innerText = "Author: " + myLibrary[i].author;
    pages_p.innerText = "Pages: " + myLibrary[i].pages;
    hasRead_p.innerText = "You have " + myLibrary[i].hasRead + " it.";
    deleteCardButton.innerText = "❌";

    title_p.classList.add("title_p");
    deleteCardDiv.classList.add("delete-button-div");
    deleteCardButton.classList.add("delete-button");
    deleteCardButton.setAttribute("title", "This will delete the card");
    book_card.classList.add("book-card");
    deleteCardButton.setAttribute("id", `${i}`);

    book_card.appendChild(deleteCardDiv);
    deleteCardDiv.appendChild(deleteCardButton);
    book_card.appendChild(title_p);
    book_card.appendChild(author_p);
    book_card.appendChild(pages_p);
    book_card.appendChild(hasRead_p);
    display_books_container.appendChild(book_card);

    deleteCardButton.addEventListener("click", (e) => {
      myLibrary.splice(e.target.id, 1);
      localStorage.setItem("UserBooks", JSON.stringify(myLibrary));
      displayBooks();
    });
  }
}
// add book button
const add_book_button = document.querySelector(".add_book_button");
const formDiv = document.querySelector("#form-div");
const card = document.querySelector(".card");

add_book_button.addEventListener("click", () => {
  // add_book_button.classList.add("zoom-out");
  display_books_container.style.display = "none";
  toggleDisplayCard();
  // setTimeout(() => {
  //   toggleDisplayCard();
  // }, transitionInterval);
});

function toggleDisplayCard() {
  card.classList.toggle("card-visibility");
  formDiv.classList.toggle("form");
}

// form submit action

const form_submit_button = document.querySelector(".form_submit_button");

form_submit_button.addEventListener("click", () => {
  // add_book_button.classList.remove("zoom-out");
  display_books_container.style.display = "flex";
  if (title.value != "") {
    let hasReadValue = hasRead[0].checked ? hasRead[0].value : hasRead[1].value;
    addBookToLibrary(title.value, author.value, pages.value, hasReadValue);
    displayBooks();

    toggleDisplayCard();

    clearform();
  } else {
    //remove the form
    toggleDisplayCard();
    //clear form
    clearform();
    //remove any error
    titleError.textContent = "";
    pagesError.textContent = "";
    authorError.textContent = "";
  }
});

// remove all books
function resetBooks() {
  display_books_container.textContent = "";
}

function clearform() {
  title.value = "";
  author.value = "";
  pages.value = "";
}

title.addEventListener("blur", () => {
  if (title.validity.valueMissing) {
    titleError.textContent = "(Please enter the Title)";
  } else {
    titleError.textContent = "";
  }
});

author.addEventListener("blur", () => {
  if (author.validity.typeMismatch) {
    authorError.textContent = "(Please enter the author)";
  } else {
    authorError.textContent = "";
  }
});

pages.addEventListener("blur", () => {
  if (pages.validity.rangeUnderflow) {
    pagesError.textContent = "(Please enter valid pages)";
  } else {
    pagesError.textContent = "";
  }
});
