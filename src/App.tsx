import React, { useState, useEffect } from 'react';

import './App.css';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './Components/Header';
import mTodo from './Models/mTodo';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';

import { collection, getDocs, deleteDoc, setDoc, doc } from "firebase/firestore";
import { db, dbRT } from "./DataAccessLayers/firebase";
import { ref, set, onValue } from "firebase/database";

import { MD5 } from './Utilities/Common';



function App() {

  const DbRTRef = ref(dbRT, '/todos/checksum');


  const [filterKeyword, setFilterKeyword] = useState("");
  const [todos, setTodos] = useState<mTodo[]>([]);
  const [todosChecksum, setTodosChecksum] = useState("");

  /*------------------------------------------------------------------------*/
  //Run when todos are updated
  useEffect(() => {
    getTodos();


  }, [todosChecksum]);

  //Run on Startup
  useEffect(() => {
    const unsubscribe = onValue(DbRTRef, (snapshot) => {
      setTodosChecksum(snapshot.val())
    }, {
      onlyOnce: false
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);
  /*------------------------------------------------------------------------*/
  //Update Checksum
  function getTodosCheckSum() {
    return MD5(todosChecksum);
  }


  //Action
  async function addTodo(todo: string) {
    const trimmedTodo = todo.trim();
    if (!trimmedTodo) return;
    if (isDuplicateTodo(trimmedTodo)) return;

    const _todo = mTodo.CreateTodo(trimmedTodo);

    setTodos(t => t = [_todo, ...t]);

    await setDoc(doc(db, "todos", _todo.getId), _todo.getObject())

    set(DbRTRef, getTodosCheckSum());
  }

  async function getTodos() {
    const todofromserver = await getDocs(collection(db, "todos"))
    let _todos = todofromserver.docs.map(t => {
      return new mTodo(t.data().id, t.data().todo, t.data().isDone, t.data().createdDate)
    });

    _todos = _todos.sort((a, b) => b.createdDate - a.createdDate);

    setTodos(_todos);
  }
  async function updateTodo(todo: mTodo) {
    setTodos(t => t.map(d => {
      if (d.getId === todo.getId) return todo;
      return d;
    }))

    await setDoc(doc(db, "todos", todo.getId), todo.getObject());
  }
  async function deleteTodo(id: string) {
    setTodos(t => t.filter(d => d.getId !== id))
    await deleteDoc(doc(db, "todos", id))
  }



  //Handlder
  function filterInputOnChange(keyword: string) {
    setFilterKeyword(keyword);
  }
  async function editBtnHandler(id: string) {
    setTodos(t => t.map(d => {
      d.isEdit = d.getId === id;
      return d;
    }))
  }
  async function updateTodoHandler(todo: mTodo) {

    if (isDuplicateTodo(todo.todo, todo.getId)) return;


    abortEditTodoHandler();
    await updateTodo(todo);
    set(DbRTRef, getTodosCheckSum());
  }
  function abortEditTodoHandler() {
    setTodos(t => t.map(d => {
      d.isEdit = false;
      return d;
    }));
  }

  async function deleteBtnHandler(id: string) {
    await deleteTodo(id);
    set(DbRTRef, getTodosCheckSum());
  }

  function isDuplicateTodo(todo: string, id: string = "") {
    const normalizedTodo = todo.trim().toUpperCase();
    if (todos.findIndex(t => t.todo.toUpperCase() === normalizedTodo && t.getId !== id) > -1) {

      return !window.confirm("Warning: Duplicated todo entered. Do you want to proceed?");
    }
    return false;
  }


  return (
    <>
      <div className="container app-shell">
        <Header></Header>
        <Table bordered hover responsive variant="light" className="todo-table mt-4">
          <tbody>

            <TodoInput
              filterKeyword={filterKeyword}
              addTodo={addTodo}
              onFocus={abortEditTodoHandler}
              filterInputOnChange={filterInputOnChange}
            ></TodoInput>

            <TodoList
              todos={todos}
              filterKeyword={filterKeyword}
              editBtnHandler={editBtnHandler}
              updateTodoHandler={updateTodoHandler}
              abortEditTodoHandler={abortEditTodoHandler}
              deleteBtnHandler={deleteBtnHandler}
            ></TodoList>

          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
