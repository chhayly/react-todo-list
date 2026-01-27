import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import mTodo from '../Models/mTodo';

type TodoProps = {
    todo: mTodo;
    editBtnHandler: (id: string) => void;
    updateTodoHandler: (todo: mTodo) => void;
    abortEditTodoHandler: () => void;
    deleteBtnHandler: (id: string) => void;
};

const Todo: React.FC<TodoProps> =
    (
        {
            todo,
            editBtnHandler,
            updateTodoHandler,
            abortEditTodoHandler,
            deleteBtnHandler
        }
    ) => {
        const [showBtn, setShowBtn] = useState(false);

        const [todoText, setTodoText] = useState(todo.todo);

        const [showInvalid, setShowInvalid] = useState(false);

        const textLineThrough: React.CSSProperties = { textDecorationLine: "line-through" };

        const disabled: React.CSSProperties = { pointerEvents: "none", opacity: 0.4, color: "red" };

        useEffect(() => {
            setTodoText(todo.todo);
        }, [todo.todo]);

        const ShowBtn = () => {
            if (todo.isFailed) return;

            setShowBtn(true)
        }
        const HideBtn = () => {
            if (todo.isFailed) return;

            setShowBtn(false);
        }

        const handleFocus = () => {
            if (todo.isFailed) return;
            setShowBtn(true);
        }

        const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
            if (todo.isFailed) return;
            // Only hide if focus is moving outside the todo item container
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setShowBtn(false);
            }
        }

        function btnDeleteOnClick() {
            deleteBtnHandler(todo.getId);
        }
        function btnEditOnClick() {
            setTodoText(todo.todo);
            editBtnHandler(todo.getId);
        }
        function handleEditKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
            if (e.key === 'Escape') {
                abortEditTodoHandler();
                setTodoText(todo.todo);
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                if (todoText.trim() === "") {
                    setShowInvalid(true);
                    return;
                }
                setShowInvalid(false);
                todo.todo = todoText.trim();

                updateTodoHandler(todo);

            }
        }
        function onCheck(e: React.ChangeEvent<HTMLInputElement>) {
            todo.isDone = e.target.checked;
            updateTodoHandler(todo);
        }

        return (
            <>
                <tr className="todo-row">
                    <td>
                        <div
                            style={!todo.isEdit ? { display: "" } : { display: "none" }}
                            onMouseEnter={ShowBtn}
                            onMouseLeave={HideBtn}
                            onFocus={handleFocus}
                            onBlur={handleBlur}>
                            <div
                                className="row px-3 text-break todo-item"
                                style={todo.isFailed ? disabled : {}}>
                                    <div className="col-1 my-2">
                                    <Form.Check type="checkbox" checked={todo.isDone} onChange={onCheck} className="float-left todo-check" />
                                    </div>


                                <div className="mr-auto col my-2 todo-text" style={todo.isDone ? textLineThrough : {}}>{todo.todo}</div>
                                <Form.Control.Feedback type="invalid" style={todo.isFailed ? { display: "block" } : { display: "none" }}>
                                    Failed to enter todo
                                </Form.Control.Feedback>

                                <div className="d-line ml-auto my-2 todo-actions" style={showBtn ? { display: "" } : { display: "none" }}>

                                    <Button variant="outline-secondary" size="sm" className="todo-action" onClick={btnEditOnClick}>Edit</Button>
                                    <Button variant="outline-danger" size="sm" className="todo-action ml-2" onClick={(btnDeleteOnClick)}>Remove</Button>
                                </div>

                            </div>

                        </div>
                        <Button variant="warning" size="sm" className="float-right" style={todo.isFailed ? { display: "" } : { display: "none" }}>Retry</Button>


                        <div style={todo.isEdit ? { display: "" } : { display: "none" }}>
                            <div className="row todo-edit">
                                <div className="col-12">
                                    <Form.Control
                                        as="textarea"
                                        required
                                        className="form-control-md todo-input"
                                        aria-label="Edit todo"
                                        value={todoText}
                                        onKeyDown={handleEditKeyDown}
                                        onChange={(e) => {
                                            if (showInvalid) setShowInvalid(false);
                                            setTodoText(e.target.value)
                                        }}
                                    ></Form.Control>
                                    <Form.Control.Feedback type="invalid" style={showInvalid ? { display: "block" } : { display: "none" }}>
                                        This field cannot be blank.
                                    </Form.Control.Feedback>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </>
        )
    }

export default Todo;
