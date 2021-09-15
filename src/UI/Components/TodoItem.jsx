import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useSelector } from "react-redux";
// if there are only a few props, it's efficient to write out props this way to avoid repetition
const TodoItem = ({ isDone, title, todoID }) => {
  const [isTodoItemDone, setTodoItemDone] = useState(isDone);
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);

  const handleChange = ({ currentTarget: { type } }) => {
    /* 
    event.currentTarget returns the ELEMENT whose evnet listeners triggered the event. 
    in this case, the checkbox input field. Then, toggle the state, access the right doc, and update the field.
    whenever this happens, the firestore reducer is called and returns the new state of the firstore. Thus, 
    in the future when we access firestore, the values will be different.
     */
    if (type === "checkbox") {
      setTodoItemDone(!isTodoItemDone);
      firestore
        .collection("users")
        .doc(uid)
        .collection("todos")
        .doc(todoID)
        .update({
          isDone: !isTodoItemDone,
        });
    }
  };

  return (
    <div
      style={{
        textDecoration: isTodoItemDone && "line-through",
        opacity: isTodoItemDone ? 0.5 : 1,
      }}
    >
      <input
        type="checkbox"
        name=""
        id=""
        onChange={handleChange}
        checked={isTodoItemDone}
      />
      {title}
    </div>
  );
};

export default TodoItem;
