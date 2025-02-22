# 📚 Online Book Store

This is a backend application for an online book store where users can browse books, purchase them, and manage their orders. It provides functionalities for user authentication, book management, and order processing.

---

## 🚀 Features

- ✅ User sign-up and login with email and password
- 🔍 Browse and search for books
- 🛒 Add books to cart 
- 🛠️ Admin can manage books (add, update, delete)
- 🔐 Secure authentication using JWT

---

## 🛠️ Technologies Used

- 🟢 Node.js
- ⚡ Express.js
- 🗄️ MongoDB
- 🔑 JSON Web Tokens (JWT) for authentication

---

## 📡 API Endpoints

### 🔐 Authentication

#### 📝 Sign Up
- **POST** `/signup` - Register a new user

#### 🔑 Login
- **POST** `/login` - Authenticate a user

---

### 📚 Books

#### 📖 Get Books
- **GET** `/books` - Retrieve a list of available books

#### ➕ Add Book (Admin only)
- **POST** `/books` - Add a new book

#### ✏️ Update Book (Admin only)
- **PUT** `/books/:id` - Update book details by ID

#### ❌ Delete Book (Admin only)
- **DELETE** `/books/:id` - Remove a book by ID

---

## 🛒 Cart 

#### ➕ Add to Cart
- **POST** `/cart/:bookId` - Add a book to the cart

#### 🛍️ View Cart
- **GET** `/cart` - View items in the cart

---

## 🤝 Contributing

- Feel free to contribute to this project by creating a pull request or reporting issues.

---


