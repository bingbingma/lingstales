import React, { Component } from "react";
import CommentList from "./comments/CommentList";
import CommentForm from "./comments/CommentForm";
import DeleteBtn from "./deleteButton";

class Comments_Section extends Component {
  // constructor for comments

  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.setComments = this.setComments.bind(this);
  }
  // component mounting for comments
  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("/api/books/5d0e4a6cf125fa1612b6a5fc/comments")
      .then(res => res.json())
      .then(res => {
        const comments = Array.isArray(res) ? res : [];
        this.setState({
          comments,
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
  setComments(comment) {
    console.log(comment);
    const comments = Array.isArray(this.state.comments) ? this.state.comments : [];

    this.setState({
      loading: false,
      comments: [...comment, ...comments]
    });
  }
  render() {
    return (
      <div className="App container bg-light">
        <header className="App-header">
          <h4 className="App-title">
            Comments
            <span className="px-2" role="img" aria-label="Chat" />
          </h4>
        </header>

        <div className="row">
          <div className="col-4  pt-3 border-right">
            <h6>Say something about this book!</h6>
            <CommentForm setComments={this.setComments} />
          </div>
          <div className="col-8  pt-3 bg-white">
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
