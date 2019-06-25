import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets a specific book
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  //Gets all comments for specific book
  getComments: function(id) {
    return axios.get("/api/books/" + id + "/comments");
  },
  // Deletes specific comment
  deleteComment: function(id, cid) {
    return axios.delete("/api/books/" + id + "/comments/" + cid);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/book", bookData);
  }
};
