import React, { useContext } from 'react';
import AuthContext from '../Auth-context';


const Header = props =>{ 
    const auth = useContext(AuthContext);
return(
    <header className='headerComponent'>
        <button className='authbtn' onClick={props.onLoadAuth}> Auth</button> 
       { auth.status ?<button className='todobtn' onClick={props.onLoadTodos}>TodoList</button>:null}
    </header>
);
}
export default Header;
