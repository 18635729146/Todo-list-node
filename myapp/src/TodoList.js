import React, { Component } from 'react';
import ListItem from "./ListItem";
import NewItem from "./NewItem";
import DeleteItem from "./DeleteItem";
import CompleteItem from "./CompleteItem";

class TodoList extends Component{

    constructor(props) {
        super(props);
        this.state = {
            todoList: [
                {content : 'React practice', done : 1},
                {content : 'game time', done : 0}
            ]
        }
    }

    addNewItem = (NewItemContent) => {
        const newList = [...this.state.todoList, { content: NewItemContent, done: 0 }]
        //合并后，需使用setState改变原来的todoList
        this.setState(
            {
                todoList: newList
            }
        )
    }

    completeItem1(content) {
        const TodoList = []//建一个新的
        this.state.todoList.forEach((element, index) => {
            //根据内容查找，如果一样，则将其done值设置为1.
            if (element.content === content) {
              const item = this.state.todoList[index]
              TodoList.push(Object.assign({}, item, {done: item.done === 0 ? 1 : 0}))
              this.setState({
                todoList: TodoList
              })
            } else {
              TodoList.push(element)
            }
          })
    }

    deleteItem1(content) {
        const data = this.state.todoList.filter(element => element.content !== content)
        this.setState({
          todoList: data
        })
    }
    
    render() {
        return (
            <div>
                {
                    //将这一部分拆分
                    //todoList.map(item => <p key={item}>{item}</p>
                    
                    //传递给子组件ListItem
                    //this.state.todoList.map(item => <ListItem item={item} />)  
                }
                <ListItem data={this.state.todoList}
                    completeItem={this.completeItem1.bind(this)}
                    deleteItem={this.deleteItem1.bind(this)} />
                
                <NewItem addItem = {this.addNewItem}/>
            </div>
        );
    }
}

export default TodoList;