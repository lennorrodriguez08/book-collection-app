// DATA COLLECTION

class BookValues {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI FUNCTIONS

class AppInterface {

    // METHOD TO ADD BOOK

    addBook(newBook) {

        const list = document.querySelector('#book-list');
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${newBook.title}</td>
            <td>${newBook.author}</td>
            <td>${newBook.isbn}</td>
            <td><a href='#'><i class="fa-solid fa-trash-can delete" style='color: red;'></i></a></td>
        `;

        list.appendChild(tr);
    }

    // METHOD TO DELETE BOOK

    deleteBook(target) {

        target.parentElement.parentElement.parentElement.remove();

    }

    // METHOD TO SHOW ALERT MESSAGES

    showAlert(message, className) {

        const div = document.createElement('div');
        div.className = 'alert ' + className;
        div.textContent = message;

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    // METHOD TO CLEAR INPUT FIELDS AFTER DATA SUBMISSION

    clearInputFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// EVENT TO ADD BOOK

document.querySelector('#book-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // INSTANTIATE BOOK VALUES CLASS

    const newBook = new BookValues(title, author, isbn);

    // INSTANTIATE APP INTERFACE CLASS

    const ui = new AppInterface();

    if (title === '' || author === '' || isbn === '') {
        
        ui.showAlert('Please fill up all the fields', 'error');

    }   else {

        ui.addBook(newBook);
        ui.showAlert(title + ' book has been added!', 'success');
        ui.clearInputFields();

    }

});

// EVENT TO DELETE BOOK

document.querySelector('#book-list').addEventListener('click', function(eventHandler) {

    // INSTANTIATE APP INTERFACE CLASS

    const ui = new AppInterface();

    if (eventHandler.target.classList.contains('delete')) {
        ui.deleteBook(eventHandler.target);
        ui.showAlert(eventHandler.target.parentElement.parentElement.parentElement.firstElementChild.textContent + ' book has been deleted', 'success')
    }

});