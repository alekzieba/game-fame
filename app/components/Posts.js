// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';
import _ from 'lodash';
import routes from '../constants/routes';

type Props = {};

export default class Posts extends Component<Props> {
  props: Props;

  // The following two functions are separate because it's
  //   typically good practice to put input components in separate
  //   functions since they can get pretty complicated.
  static renderAuthorInput(field) {
    return (
      <input
        type="text"
        className="form-control"
        placeholder={field.placeholder}
        autoFocus
        {...field.input}
      />
    );
  }

  static renderPostContentInput(field) {
    return (
      <input
        type="text"
        className="form-control"
        placeholder={field.placeholder}
        {...field.input}
      />
    );
  }

  componentDidMount() {
    const { getPosts } = this.props;

    getPosts();
  }

  displayPosts() {
    const { posts, deletePost } = this.props;
    if (!posts || _.isEmpty(posts)) {
      return <h4>No posts yet...</h4>;
    }

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Author</th>
            <th scope="col">Post</th>
            <th scope="col">When</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {_.map(posts, (post, postID) => (
            <tr key={postID}>
              <td>{post.author}</td>
              <td>{post.content}</td>
              <td>{post.datetime}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={deletePost.bind(this, postID)}
                >
                  Click to Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  newPost(values) {
    const { createPost } = this.props;

    createPost({ ...values, datetime: new Date().toLocaleString() });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div data-tid="backButton">
            <Link to={routes.HOME}>
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <form onSubmit={handleSubmit(this.newPost.bind(this))}>
              <label>Author</label>
              <div className="form-group">
                <Field
                  name="author"
                  placeholder="John Smith"
                  component={this.constructor.renderAuthorInput}
                />
              </div>
              <label>Post Content</label>
              <div className="form-group">
                <Field
                  name="content"
                  placeholder="I had a good day today."
                  component={this.constructor.renderPostContentInput}
                />
              </div>
              <button type="submit" className="btn btn-lg btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <br />
        <h3>All Posts from Everyone (in real time)</h3>
        {this.displayPosts()}
      </div>
    );
  }
}
