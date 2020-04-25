import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';

class MainMenu extends Component {
  state = {
    showForm: false,
    formValue: "",
    username: "",
    sessionId: "",
  };

  inputChange = e => {
    this.setState({ formValue: e.target.value });
  };

  loginChange = e => {
    this.setState({ username: e.target.value });
  };

  formSubmit = e => {
    const { formValue } = this.state;
    const { addTodo } = this.props;
    e.preventDefault();
    addTodo({ title: formValue });
    this.setState({ formValue: "" });
  };

  loginFormSubmit = e => {
    // const { username } = this.session;
    // const { addSession } = this.props;
    e.preventDefault();
    // addSession({ username: username });
    this.setState({ sessionId: Math.round(Math.random() * 1000000) });
  };

  renderLoginForm = () => {
    const { username, sessionId } = this.state;
    if (!sessionId) {
      return (
        <div>
          <form onSubmit={this.loginFormSubmit}>
            <div>
              <span>Your Username: </span>
              <input
                className="input"
                value={username}
                onChange={this.loginChange}
                id="username"
                type="text"
              />
              <label htmlFor="username"></label>
              <button className="button" type="submit">Login</button>
            </div>
          </form>
        </div>
      );
    }
  };

  renderForm = () => {
    const { showForm, formValue } = this.state;
    if (showForm) {
      return (
        <div>
          <form onSubmit={this.formSubmit}>
            <div>
              <span>New game ID: </span>
              <input
                className="input"
                value={formValue}
                onChange={this.inputChange}
                id="gameId"
                type="text"
              />
              <label htmlFor="gameId"></label>
              <button className="button" type="submit">Create</button>
            </div>
          </form>
        </div>
      );
    }
  };

  renderNewGame() {
    const { data } = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ListItem key={key} gameCode={key} game={value} />;
    });
    if (!_.isEmpty(toDos)) {
      return toDos;
    }
    return (
      <div>
        <h4>There are no current game rooms. Please create a new Game room</h4>
      </div>
    );
  }
  componentWillMount() {
    this.props.fetchToDos();
  }
  render() {
    const { showForm, username, sessionId } = this.state;
    if (!(sessionId && username)) {
      return (
        <div>
          {this.renderLoginForm()}
        </div>
      );
    } else {
      return (
        <div>
          <div>
            {this.renderForm()}
            {this.renderNewGame()}
          </div>
          <div>
            <button className="button" onClick={() => this.setState({ showForm: !showForm })}>
              {showForm ? (
                <i>Cancel</i>
              ) : (
                  <i>Create new Game</i>
                )}
            </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ data }) => {
  return {
    data
  }
}

export default connect(mapStateToProps, actions)(MainMenu);