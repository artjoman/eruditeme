import { fb } from '../firebase'
import { SESSION } from './types';

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
