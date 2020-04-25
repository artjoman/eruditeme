
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { completeToDo, joinGame } from '../actions';

class ListItem extends Component {

    completeClick = completeTodoId => {
        const { completeToDo } = this.props;
        // completeToDo(completeTodoId);
    };

    joinGameClick = (gameId) => {
        const { joinGame } = this.props;
        // joinGame(gameId);
    };

    render() {
        const { gameCode, game } = this.props;
        return (
            <div key="gameCode" className="col s10 offset-s1 to-do-list-item black">
                <h4>
                    {game.title}
                    <span

                        className="complete-todo-item waves-effect waves-light blue lighten-5 blue-text text-darken-4 btn"
                    >
                        <button onClick={() => this.joinGameClick(gameCode)} className="large button material-icons">Join Game</button>
                        <button onClick={() => this.completeClick(gameCode)} className="large button material-icons delete-button">Delete Game</button>
                    </span>
                </h4>
            </div>
        );
    }
}

export default connect(null)(ListItem);