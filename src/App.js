import React, { useState } from 'react';

import './App.css';
import Todo from './component/todo';
import Header from './component/Header';
import Auth from './component/Auth';
import AuthContext from './Auth-context';



function App() {
  const [page, setPage] = useState('auth');
  const [authStatus,setAuthStatus] = useState(false)
  const switchPage = pageName => {
    setPage(pageName)
  }
const login = ()=> {
  setAuthStatus(true)
}
  return (
    <React.Fragment >
      <AuthContext.Provider value = {{status:authStatus,login:login}}>
        <div className='mainPage'>
          <Header
            onLoadTodos={switchPage.bind(this, 'todos')}
            onLoadAuth={switchPage.bind(this, 'auth')} />
          <hr></hr>
          {page === 'auth' ? <Auth /> : <Todo />}
        </div>

      </AuthContext.Provider>

    </React.Fragment>
  )
}
export default App;
