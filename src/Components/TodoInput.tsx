import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

type TodoInputProps = {
    addTodo: (todo: string) => void;
    onFocus: () => void;
    filterKeyword: string;
    filterInputOnChange: (keyword: string) => void;
};

const TodoInput: React.FC<TodoInputProps> = ({
    addTodo,
    onFocus,
    filterKeyword,
    filterInputOnChange
}) => {
    const [showInvalid, setShowInvalid] = useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const value = e.currentTarget.value.trim();
            if (value === "") {
                setShowInvalid(true);
                return;
            }
            setShowInvalid(false);

            addTodo(value)
            filterInputOnChange("")
            return;
        }
        if (e.key === 'Escape') {
            setShowInvalid(false);
            filterInputOnChange("");
        }
    }

    function onFocusTodoInput() {
        onFocus();
    }


    return (
        <>
            <tr className="todo-input-row">
                <td>
                    <div className="row">
                        <div className="col-12 h-auto">
                            <Form.Control
                                required
                                as="textarea"
                                rows={2}
                                className="form-control-md h-75 todo-input"
                                aria-label="Enter a new todo"
                                value={filterKeyword}
                                onKeyDown={handleKeyDown}
                                onFocus={onFocusTodoInput}
                                onChange={(e) => {
                                    if (showInvalid) setShowInvalid(false);
                                    filterInputOnChange(e.target.value);
                                }}
                                placeholder="Add a task and press Enter..."
                            ></Form.Control></div>
                        <Form.Control.Feedback
                            className="ml-3 todo-invalid-feedback"
                            className="ml-3"
>>>>>>> b26abb634dd58dcbdff110ba23f56e9e3476394d
                            type="invalid"
                            style={showInvalid ? { display: "block" } : { display: "none" }}>
                            This field cannot be blank.
                        </Form.Control.Feedback>
                    </div>
                </td>
            </tr>
        </>
    );
}

export default TodoInput;
