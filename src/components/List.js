import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions';
import ListItem from './ListItem';

class List extends Component {
  state = {
    showForm: false,
    formValue: ""
  };

  inputChange = e => {
    this.setState({formValue: e.target.value});
  };

  formSubmit = e => {
    const {formValue} = this.state;
    const { dispatch } = this.props;
    e.preventDefault();
    this.setState({formValue: ""});
    //add session
    dispatch(actions.addSession({
      name: this.state.formValue
    }));
  };

  renderForm = () => {
    const {showForm, formValue} = this.state;
    if (showForm) {
      return (
        <div>
          <form onSubmit={this.formSubmit}>
            <div>
              <span>New game ID: </span>
              <input 
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

  renderToDo() {
    const {data} = this.props;
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
  
  render() {
    const {showForm} = this.state;
    return (
      <div>
        <div>
          {this.renderForm()}
          {this.renderToDo()}
        </div>
        <div>
          <button className="button" onClick={() => this.setState({showForm: !showForm})}>
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

const mapStateToProps = (state) => {
  return {
      session: state.session
  }
}

export default connect(mapStateToProps)(List);