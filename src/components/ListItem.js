
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { completeToDo } from '../actions';
import fb from "./../firebase";

class ListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
          session: null
        }
    }

    completeClick = completeTodoId => {
        const { completeToDo } = this.props;
        completeToDo(completeTodoId);
    };

    componentDidMount() { }

    render() {
        const { gameCode, game, session } = this.props;
        return (
            <div key="gameCode" className="col s10 offset-s1 to-do-list-item black">
                <h4>
                    {game.title}
                    <span
                        onClick={() => this.completeClick(gameCode)}
                        className="complete-todo-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
                    >
                        <button className="large button material-icons">Join Game</button>
                        <button className="large button material-icons delete-button">Delete Game</button>
                    </span>
                </h4>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        session: state.session
    }
  }

export default connect(mapStateToProps, { completeToDo })(ListItem);