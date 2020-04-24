import { todosRef } from '../firebase'
const FETCH_TODOS = 'FETCH_TODOS';

export const addTodo = newToDo => async dispatch => {
    todosRef.push().set(newToDo);
};

export const completeToDo = completeToDo => async dispatch => {
    todosRef.child(completeToDo).remove();
};

export const joinGame = (gameId) => async dispatch => {
    // TODO: Initiate session
    // Write to db that user joined the game
    
    todosRef.child(gameId).remove();
};

export const fetchToDos = () => async dispatch => {
    todosRef.on("value", snapshot => {
        dispatch({
            type: FETCH_TODOS,
            payload: snapshot.val()
        });
    });
};