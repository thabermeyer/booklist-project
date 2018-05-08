/* ***** ES6 METHOD ***** */

class Book {

    constructor(title, author, isbn) {

        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }

}

class UI {

    addBookToList(book) {

        const list = document.querySelector('.book__table');

        list.innerHTML += `
        
            <div class="book__item book__item--list-item">${book.title}</div>
            <div class="book__item book__item--list-item">${book.author}</div>
            <div class="book__item book__item--list-item">${book.isbn}</div>
            <div class="book__item book__item--list-item"><a href="#" class="book__delete">X</a></div>
        
        `;

    }

    showAlert(message, className) {

        const div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
    
        const container = document.querySelector('.container__top');
        const form = document.querySelector('.book__form');
    
        container.insertBefore(div, form);
    
        setTimeout(function() {
    
            document.querySelector('.alert').remove();
    
        }, 2000);

    }

    deleteBook(target) {

        target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.remove();
        target.parentElement.previousElementSibling.previousElementSibling.remove();
        target.parentElement.previousElementSibling.remove();
        target.parentElement.remove();

    }

    clearFields() {

        document.getElementById('book__title').value = '';
        document.getElementById('book__author').value = '';
        document.getElementById('book__isbn').value = '';

    }

}

// Local Storage class

class Store {

    static getBooks() {

        let books;

        if(localStorage.getItem('books') === null) {

            books = [];

        } else {

            books = JSON.parse(localStorage.getItem('books'));

        }

        return books;

    }

    static displayBooks() {

        const books = Store.getBooks();

        books.forEach(function(book) {

            const ui = new UI;

            // Add book to UI

            ui.addBookToList(book);

        });

    }

    static addBook(book) {

        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) {

        const books = Store.getBooks();

        books.forEach(function(book, index) {

            if(book.isbn === isbn) {

                books.splice(index, 1);

            }

        });

        localStorage.setItem('books', JSON.stringify(books));

    }

}

// DOM Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listeners

document.querySelector('.book__btn').addEventListener('click', function() {

    // Get form values

    const title = document.getElementById('book__title').value;
    const author = document.getElementById('book__author').value;
    const isbn = document.getElementById('book__isbn').value;

    // Instantiate book

    const book = new Book(title, author, isbn);

    // Instantiate UI

    const ui = new UI();

    // Validate

    if(title === '' || author === '' || isbn === '') {

        ui.showAlert('Please fill in all fields', 'alert--danger');

    } else {

        // Add book to list

        ui.addBookToList(book);

        // Add to LS

        Store.addBook(book);

        // Alert

        ui.showAlert('Book added', 'alert--success');

        // Clear input fields

        ui.clearFields();

    }

});

document.querySelector('.book__table').addEventListener('click', function(e) {

    // Instantiate UI

    const ui = new UI();

    // Delete book

    if(e.target.className === 'book__delete') {

        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

        ui.deleteBook(e.target);

        ui.showAlert('Book deleted', 'alert--success');

    }

    e.preventDefault();

});





/* ***** ES5 METHOD *****

// Book Constructor

function Book(title, author, isbn) {

    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

// UI Constructor

function UI() {}

// Add book to list

UI.prototype.addBookToList = function(book) {

    const list = document.querySelector('.book__table');

    list.innerHTML += `
    
        <div class="book__item book__item--list-item">${book.title}</div><div class="book__item book__item--list-item">${book.author}</div><div class="book__item book__item--list-item">${book.isbn}</div><div class="book__item book__item--list-item"><a href="#" class="book__delete">X</a></div>
    
    `;
        
}

// Clear fields

UI.prototype.clearFields = function() {

    document.getElementById('book__title').value = '';
    document.getElementById('book__author').value = '';
    document.getElementById('book__isbn').value = '';

}

// Show alert

UI.prototype.showAlert = function(message, className) {

    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector('.container__top');
    const form = document.querySelector('.book__form');

    container.insertBefore(div, form);

    setTimeout(function() {

        document.querySelector('.alert').remove();

    }, 2000);

}

// Delete book from list

UI.prototype.deleteBook = function(target) {

    target.parentElement.previousSibling.previousSibling.previousSibling.remove();
    target.parentElement.previousSibling.previousSibling.remove();
    target.parentElement.previousSibling.remove();
    target.parentElement.remove();

}

// Event Listeners

document.querySelector('.book__btn').addEventListener('click', function() {

    // Get form values

    const title = document.getElementById('book__title').value;
    const author = document.getElementById('book__author').value;
    const isbn = document.getElementById('book__isbn').value;

    // Instantiate book

    const book = new Book(title, author, isbn);

    // Instantiate UI

    const ui = new UI();

    // Validate

    if(title === '' || author === '' || isbn === '') {

        ui.showAlert('Please fill in all fields', 'alert--danger');

    } else {

        // Add book to list

        ui.addBookToList(book);

        ui.showAlert('Book added', 'alert--success');

        // Clear input fields

        ui.clearFields();

    }

});

document.querySelector('.book__table').addEventListener('click', function(e) {

    // Instantiate UI

    const ui = new UI();

    // Delete book

    if(e.target.className === 'book__delete') {

        ui.deleteBook(e.target);

        ui.showAlert('Book deleted', 'alert--success');

    }

    e.preventDefault();

});

*/