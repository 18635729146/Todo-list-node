import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Component } from 'react';
import TodoListHeader from './TodoListHeader';
import TodoList from './TodoList';
class App extends Component{
  render() {
    // const todoList = [
    //   'React practice',
    //   'game time'
    // ];
    return (
      <div className="App">
        <TodoListHeader />
        <TodoList/>
      </div>
      
    );
  }
}
// function App() {
//   const todoList = [
//     'React practice',
//     'game time'
//   ];
//   return (
//     <div className="App">
//       <h2>Todo List</h2>
//       {
//         todoList.map(item => <p>{item}</p>)
//       }
//     </div>
//   );
// }

export default App;
