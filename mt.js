const express = require('express');

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction"
    },
    {
        id: 2,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self-Help"
    },
    {
        id: 3,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        category: "Finance"
    }
];


app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    res.json(book);
});


app.post('/books', (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    };

    books.push(newBook);

    res.status(201).json(newBook);
});


app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id == req.params.id);

    if (!book) {
        return res.status(404).send("Book not found");
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.category = req.body.category;

    res.json(book);
});


app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id != req.params.id);

    res.send("Book deleted successfully");
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
