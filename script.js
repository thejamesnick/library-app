// Store Array

const myLibrary = [];

// Book Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

// Book Prototype Method

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Add Book to Library

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    displayBooks();
}

// Display Books

function displayBooks () {
    const libraryContainer = document.getElementById('libraryContainer');
    libraryContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.setAttribute('data-index', index);


        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>${book.read ? 'Read' : 'Not Read'}</p>
            <button class="toggle-read">${book.read ? 'Not Read' : 'Read'}</button>
            <div class="buttons">
                <button class="toggle-read-btn">Toggle Read</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const toggleReadBtn = bookCard.querySelector('.toggle-read-btn');
        const deleteBtn = bookCard.querySelector('.delete-btn');

        toggleReadBtn.addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });

        deleteBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });

        libraryContainer.appendChild(bookCard);

    });

}

const dialog = document.getElementById('bookDialog');
const addBookBtn = document.getElementById('addBookBtn');
const cancelBtn = document.getElementById('cancelBtn');
const bookForm = document.getElementById('bookForm');

addBookBtn.addEventListener('click', () => {
    dialog.showModal();
});

cancelBtn.addEventListener('click', () => {
    dialog.close();
});

bookForm.addEventListener('submit', (e) => {
    e.preventDefault();


    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    addBookToLibrary(title, author, pages, read);

    dialog.close();
    bookForm.reset();

});

