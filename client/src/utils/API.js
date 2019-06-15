import axios from "axios";

export default {
  // Gets all pages
  getPages: function() {
    return axios.get("/api/page");
  },
  // Gets the page with the given id
  getPage: function(id) {
    return axios.get("/api/page/" + id);
  },
  // Deletes the book with the given id
  deletePage: function(id) {
    return axios.delete("/api/page/" + id);
  },
  // Saves a book to the database
  savePage: function(pageData) {
    return axios.post("/api/page", pageData);
  }
};
