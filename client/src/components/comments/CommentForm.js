import React, { Component } from "react";

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

  handleFieldChange = event => {
    const { value, author } = event.target;
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [author]: value
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
      author: comment.name,
      text: comment.message,
      date: new Date()
    };
    fetch("http://localhost:3001/api/books/5d0e4a6cf125fa1612b6a5fc/comments", {
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
        if (res.error) {
          this.setState({ loading: false, error: res.error });
        } else {
          // add time return from api and push comment to parent state
          comment.time = res.time;
          this.props.addComment(comment);

          // clear the message box
          this.setState({
            loading: false,
            comment: { ...comment, text: "" }
          });
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
              rows="5"
            />
          </div>

          {this.renderError()}

          <div className="form-group">
            <button disabled={this.state.loading} className="btn btn-primary">
              Comment &#10148;
            </button>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
