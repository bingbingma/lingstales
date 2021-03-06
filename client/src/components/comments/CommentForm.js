import React, { Component } from "react";
import API from "../../utils/API";

export default class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",

      comment: {
        author: "",
        text: "",
        date: ""
      }
    };

    // bind context to methods
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

    componentDidMount() {
    this.loadComments();
  }

  // Loads all books  and sets them to this.state.books
  loadComments = (bookID) => {
    API.getComments(bookID)
      .then(res => {
        this.props.setComments(res.data);
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  deleteComment = id => {
    API.deleteComment(id)
      .then(res => this.loadComments(id))
      .catch(err => console.log(err));
  };

  handleFieldChange = event => {
    const { value, name } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [name]: value
      }
    });
  };


  onSubmit(e) {
    // prevent default form submission
    e.preventDefault();
    if (!this.isFormValid()) {
      this.setState({ error: "All fields are required." });
      return;
    }

    // loading status and clear error
    this.setState({ error: "", loading: true });

    // persist the comments on server
    let { comment } = this.state;
    let payload = {
      author: comment.author,
      text: comment.text,
      date: new Date()
    };
    const bookId = process.env.NODE_ENV === 'development' ? "5d154769fe5bcb2b9c95c201" : "5d155128ddab6642c0604f23"

    fetch(`/api/books/${bookId}/comments`, {
      method: "POST",
      mode: "cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(res => {
        console.log("[DEBUG] result", res)
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          this.loadComments(bookId);
        }
      })
      .catch(err => {
        this.setState({
          error: "Something went wrong while submitting form.",
          loading: false
        });
      });
  }

  isFormValid() {
    return this.state.comment.author !== "" && this.state.comment.text !== "";
  }

  renderError() {
    return this.state.error ? (
      <div className="alert alert-danger">{this.state.error}</div>
    ) : null;
  }

  render() {
    console.log("[DEBUG] check env", process.env.NODE_ENV)
    return (
      <React.Fragment>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              onChange={this.handleFieldChange}
              value={this.state.comment.author}
              className="form-control"
              placeholder="😎 Your Name"
              name="author"
              type="text"
            />
          </div>

          <div className="form-group">
            <textarea
              onChange={this.handleFieldChange}
              value={this.state.comment.text}
              className="form-control"
              placeholder="🤬 Your Comment"
              name="text"
              rows="3"
            />
          </div>

          {this.renderError()}

          <div className="form-group text-left">
            <button disabled={this.state.loading} className="btn btn-custom">
              Comment &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
