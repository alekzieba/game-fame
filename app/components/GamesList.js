import React, { Component } from 'react';
import { Field } from 'redux-form';
import _ from 'lodash';
import routes from '../constants/routes.json';

class GamesList extends Component {
  static renderGameCodeInput(field) {
    return (
      <input
        type="text"
        className="form-control"
        placeholder={field.placeholder}
        style={{ width: '20em', display: 'inline' }}
        autoFocus
        {...field.input}
      />
    );
  }

  enterCode(values) {
    const { history } = this.props;

    const gameKey = `tictactoe/${values.game_code}`;
    history.push({
      pathname: routes.TICTACTOE,
      gameKey,
      exists: true
    });
  }

  renderGameList() {
    const { games, history, handleSubmit } = this.props;
    if (!games || _.isEmpty(games)) {
      return (
        <div className="text-center">
          <br />
          <br />
          <h4 className="text-center">
            Click the button below to make your first game!
          </h4>
          <br />
          <button
            type="button"
            className="btn btn-lg"
            onClick={() => history.push(routes.CREATE_GAME)}
          >
            Create New Game
          </button>
          <br />
          <br />
          <br />
          <h4 className="text-center">Or enter a game code to join a game:</h4>
          <br />
          <form onSubmit={handleSubmit(this.enterCode.bind(this))}>
            <div className="form-group text-center">
              <Field
                name="game_code"
                placeholder="ABCDEFG"
                component={this.constructor.renderGameCodeInput}
              />
            </div>
            <button type="submit" className="btn btn-lg btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
    }

    // <tbody>
    //   // {_.map(posts, (post, postID) => (
    //   //   <tr key={postID}>
    //   //     <td>{post.author}</td>
    //   //     <td>{post.content}</td>
    //   //     <td>{post.datetime}</td>
    //   //     <td>
    //   //       <button
    //   //         type="button"
    //   //         className="btn btn-danger"
    //   //         onClick={deletePost.bind(this, postID)}
    //   //       >
    //   //         Click to Delete
    //   //       </button>
    //   //     </td>
    //   //   </tr>
    //   // ))}
    // </tbody>

    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Game Code</th>
            <th scope="col">Active</th>
            <th scope="col">Your Turn</th>
          </tr>
        </thead>
      </table>
    );
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <br />
        <h1 className="text-center">Welcome, {auth.given_name}!</h1>
        {this.renderGameList()}
      </div>
    );
  }
}

export default GamesList;
