import React from 'react'
import mTodo from '../Models/mTodo';
import Todo from './Todo';

const TodoList: React.FC<
    {
        todos: mTodo[],
        filterKeyword: string,
        editBtnHandler: (id: string) => void,
        updateTodoHandler: (todo: mTodo) => void,
        abortEditTodoHandler: () => void,
        deleteBtnHandler: (id: string) => void
    }> =
    (
        {
            todos,
            filterKeyword,
            editBtnHandler,
            updateTodoHandler,
            abortEditTodoHandler,
            deleteBtnHandler
        }) => {

        const normalizedFilterKeyword = filterKeyword.toUpperCase();
        const filteredTodos = todos.filter(d => d.todo.toUpperCase().includes(normalizedFilterKeyword));

        return (<>
            {filteredTodos
                .map((t) => (
                    <Todo
                        key={t.getId}
                        todo={t}
                        editBtnHandler={editBtnHandler}
                        updateTodoHandler={updateTodoHandler}
                        abortEditTodoHandler={abortEditTodoHandler}
                        deleteBtnHandler={deleteBtnHandler}
                    ></Todo>
                ))}

            <tr
                className="text-center"
                style={filteredTodos.length === 0 ? { display: "" } : { display: "none" }}>
                <td>No result. Create a new one instead!</td>
            </tr>
        </>);
    }

export default TodoList;
