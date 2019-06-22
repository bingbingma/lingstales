//this is the backend to track which page things are on

import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/book");
  },
  // Gets the page with the given id
  getBook: function(id) {
    return axios.get("/api/book/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/book/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/book", bookData);
  }
};
