import AddTodo from "../Components/AddTodo";
import ToDoItem from "../Components/TodoItem";
import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
/* 
This component displays the user's name and a list of all the todo items. So, it
needs to access all the todo items. for this we need to use useFirestoreConnect, which
takes an object as an argument with a firestore path, listens to the path, and makes the data available in our 
Redux state. Then, we can access this data with useSelector.
*/
const Todos = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  /* 
    get the todos collection inside the specific user and store it in an object called todos.
    This object will be stored in the redux state as a property of firestore.data.
    It has a collection property whose value is the path of the collection we want (a.k.a. todos) 
    */
  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    // store in the redux state as a field with the name todos.
    storeAs: "todos",
  });
  // access that element of the redux state that has now been created
  const todos = useSelector((state) => state.firestore.data.todos);
  console.log(todos);
  return (
    <div>
      <h3>Hello {displayName}</h3>
      <h4>Todos</h4>
      <AddTodo />
      <ul
        style={{
          listStyleType: "none",
        }}
      >
        {todos && // make sure todos is not null by using short-circuit evaluation
          /* 
          To iterate through an object, we use Object.values.map. (Object.values is an array of the) 
          values! you can also use keys but we want the value because each value is an object with properties.
          values is a function which takes the object and returns an array of the values.
          */
          Object.values(todos).map((todo) => (
            <li>
              <ToDoItem
                key={todo.todoID}
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;
