import React, { Component } from 'react';
import { Field } from 'redux-form';

class CreateGame extends Component {
  static renderGameCodeInput(field) {
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

  static renderGameTypeInput(field) {
    return (
      <select className="form-control" {...field.input}>
        <option value="checkers">Checkers</option>
        <option value="tictactoe">Tic-Tac Toe</option>
      </select>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <br />
            <h1 className="text-center">Create Game</h1>
            <br />
            <form>
              <div className="form-group text-center">
                <label>Game Type</label>
                <Field
                  name="game_type"
                  component={this.constructor.renderGameTypeInput}
                />
              </div>
              <br />
              <div className="form-group text-center">
                <label>Email</label>
                <Field
                  name="email"
                  placeholder="steve@apple.com"
                  component={this.constructor.renderGameCodeInput}
                />
              </div>
              <br />
              <div className="text-center">
                <button type="submit" className="btn btn-lg btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGame;
