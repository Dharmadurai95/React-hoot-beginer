import React,{ useContext } from 'react';
import AuthContext from '../Auth-context';



const Auth = props => {
    const auth = useContext(AuthContext);
    return(
      <button className='login' onClick={auth.login}>LOGIN</button>
    );
};
export default Auth;