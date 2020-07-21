import React, { Fragment } from 'react';

const List = (props) => {
    return (
        <Fragment>
            {
                props.todoList.map((value, index) => {
                    return (
                        <li key={index}
                            onClick={props.onClick.bind(this, value.id)}>
                            {value.name}
                        </li>
                    )
                })
            }
        </Fragment>

    )
};
export default List;