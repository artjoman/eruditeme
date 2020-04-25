import {fb} from '../firebase'
const FETCH_TODOS = 'FETCH_TODOS';

export const addTodo = newToDo => async dispatch => {
  todosRef.push().set(newToDo);
};

export const completeToDo = completeToDo => async dispatch => {
  todosRef.child(completeToDo).remove();
};

export const fetchToDos = () => async dispatch => {
  todosRef.on("value", snapshot => {
    dispatch({
      type: FETCH_TODOS,
      payload: snapshot.val()
    });
  });
};



export const addSession = (sesion) => dispatch => {
  fb.database()
      .ref('session')
      .push(session)
      .then((data)=>{ })
      .catch((error)=>{
          console.log('error ' , error)
      })
};

export const updateSession = (key, session) => dispatch => {
  fb.database()
      .ref('session/')
      .child(key)
      .update(session)
      .then((data) => { })
      .catch((error) => {
          console.log(error)
      });
};
