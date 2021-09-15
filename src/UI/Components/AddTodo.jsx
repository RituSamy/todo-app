import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
/* 
inside each user document, we will create another collection called 'todos' where each to-do
item is stored as a document with its own unique ID. Each item has three props: isDone, title, and todoID.
(which will be the same as the document id provided by firebase)
*/
const AddTodo = () => {
  // the current todo item being created
  const [presentToDo, setPresentToDo] = useState("");
  // useFirestore() returns a firestore object we can use in operations.
  const firestore = useFirestore();
  // use destructuring to get the uid from auth, a.k.a. the current user's id
  const { uid } = useSelector((state) => state.firebase.auth);
  /* 
handleChange takes an event with a target--the element itself--which has a name and value, among other things.
if the element name is addTodo, set the present todo to the value
*/
  const handleChange = ({ currentTarget: { name, value } }) => {
    if (name === "addTodo") {
      setPresentToDo(value);
    }
  };
  /* 
access the users collection, then get the specific user doc using uid, then the todo collection. Then, add a new document
(with a random ID) with title and isDone. then, update it to add another field, todoID which is equal to the doc id.
finally, reset the present todo item, thus clearing the input field.
*/
  const addNewTodo = (todo) => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("todos")
      .add({
        title: todo,
        isDone: false,
      })
      .then((docRef) => {
        docRef.update({
          todoID: docRef.id,
        });
      });
    // reset the present (not yet created) todo item
    setPresentToDo("");
  };

  return (
    // action specifies where to send the data after the form is submitted. (we're not sending the data anywhere)
    <div>
      <form action="">
        <input
          type="text"
          name="addTodo"
          value={presentToDo}
          onChange={handleChange}
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            addNewTodo(presentToDo);
          }}
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
