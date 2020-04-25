import { fb } from '../firebase'
import { SESSION, ROOMS } from './types';

export const getSession = (key) => async dispatch => {
  fb.database()
      .ref('/session/'+key)
      .on('value', snapshot => { 
        dispatch({
          type: SESSION,
          data: snapshot.val()
        });
      });
};

export const addSession = (session) => dispatch => {
  fb.database()
      .ref('session')
      .push(session)
      .then((data)=>{ 
        dispatch(getSession(data.key))
      })
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

export const getRooms = () => async dispatch => {
  fb.database()
      .ref('/rooms')
      .on('value', snapshot => { 
        dispatch({
          type: ROOMS,
          data: snapshot.val()
        });
      });
};
