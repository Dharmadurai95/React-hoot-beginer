import React, { useState, Fragment, useEffect,useReducer,useRef,useMemo } from 'react';
import axios from 'axios';
import List from './list';


const Todo = props => {
    // const [todoListName, setTodoListName] = useState('');
    // const [todolist, settodolist] = useState([]);
    const [inputValid,setInputValid] = useState(false);
    const [storedata, setStoreData] = useState(null);

    const inputRef = useRef();




    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todos => {
                    return todos.id !== action.payload
                });
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, [])

    // const todoHandler = (event) => {
    //     setTodoListName(event.target.value)
    // }


    //checking method

    useEffect(() => {
        axios.get('https://todolist-97437.firebaseio.com/todolist.json')
            .then(response => {
                const data = response.data;
                const givendata = [];
                for (const key in data) {
                    givendata.push({ id: key, name: data[key].name })
                }
                dispatch({ type: 'SET', payload: givendata });
            })
    }, []);

    useEffect(() => {
        if (storedata) {
            //settodolist(todolist.concat(storedata))
            dispatch({ type: 'ADD', payload: storedata });
        }
    }, [storedata]);

  

    const todoAddHandler = () => {
        const inputdata = inputRef.current.value;
      
        axios
            .post("https://todolist-97437.firebaseio.com/todolist.json", { name: inputdata })
            .then(response => {
                setTimeout(() => {
                    const todoItem = { id: response.data.name, name: inputdata}
                    dispatch({ type: 'ADD', payload: todoItem })
                }, 2000)

            })
    };

    const removeHandler = (todoid) => {
        axios.delete(`https://todolist-97437.firebaseio.com/todolist/${todoid}.json`)
            .then(res => {
                dispatch({ type: 'REMOVE', payload: todoid })
            })
            .catch(error => {
                console.log(error)
            })
    }

    //validation
    const inputValidHandler = (event) => {
        if(event.target.value.trim() !== '') {
           setInputValid(true)
        } else {
            setInputValid(false)
        }
    }

    return (
        <Fragment>
            <div className="App">
                <h2 className='heading'>Here your todo lists</h2>
                <input
                    type='text'
                    placeholder='enter your todolists'
                    onChange={inputValidHandler}
                    ref={inputRef}
                    style={{backgroundColor: inputValid ? 'rgba(230, 117, 120, 89)': 'tomato'}}
                /><br></br>
                <button className='sbt' onClick={todoAddHandler} >Add todoList</button>
                <ul>
                 { useMemo(()=> {
                    return <List todoList={todoList} onClick ={removeHandler} />
                 },[todoList])}
                </ul>
            </div>
        </Fragment>

    );
};
export default Todo;
