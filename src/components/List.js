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
    const {addTodo} = this.props;
    e.preventDefault();
    addTodo({title: formValue});
    this.setState({formValue: ""});
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
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      );
    }
  };
  renderToDo() {
    const {data} = this.props;
    const toDos = _.map(data, (value, key) => {
      return <ListItem key={key} todoId={key} todo={value} />;
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
    const {showForm} = this.state;
    return (
      <div>
        <div>
          {this.renderForm()}
          {this.renderToDo()}
        </div>
        <div>
          <button onClick={() => this.setState({showForm: !showForm})}>
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

const mapStateToProps = ({data}) => {
  return {
    data
  }
}

export default connect(mapStateToProps, actions)(List);