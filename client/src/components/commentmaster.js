import React, { Component } from "react";
import CommentList from "./comments/CommentList";
import CommentForm from "./comments/CommentForm";

class Comments_Section extends Component {
  // constructor for comments

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }
  // component mounting for comments
  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("http://localhost:3001/api/books/5d0e4a6cf125fa1612b6a5fc/comments")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  /**
   * Add new comment section function
   * @param {Object} comment
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }
  render() {
    return (
      <div className="Comment container border-top">
        <header className="Comment-header">
          <h5 className="Comment-title text-left">
            Comments
            <span className="badge badge-success">
              {this.state.comments.length}
            </span>
            <span className="px-2" role="img" aria-label="Chat" />
          </h5>
        </header>

        <div className="row">
          <div className="col-12">
            <h6 className="text-left">Say something about this book!</h6>
            <CommentForm addComment={this.addComment} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default Comments_Section;
