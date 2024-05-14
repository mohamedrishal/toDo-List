import React, { createContext, useState } from "react";
export const addTodosResponseContext = createContext();
export const EditTodosResponseContext = createContext();
export const DeleteTodosResponseContext = createContext();
export const ItemSelectedResponseContext = createContext();

function ContextShare({ children }) {
  const [addTodosResponse, setAddTodosResponse] = useState({});
  const [editTodosResponse, setEditTodosResponse] = useState({});
  const [deleteTodosResponse, setDeleteTodosResponse] = useState({});
  const [itemSelectedResponse, setItemSelectedResponse] = useState({});

  return (
    <>
      <addTodosResponseContext.Provider
        value={{ addTodosResponse, setAddTodosResponse }}
      >
        <EditTodosResponseContext.Provider
          value={{ editTodosResponse, setEditTodosResponse }}
        >
          <DeleteTodosResponseContext.Provider
            value={{ deleteTodosResponse, setDeleteTodosResponse }}
          >
            <ItemSelectedResponseContext.Provider
              value={{ itemSelectedResponse, setItemSelectedResponse }}
            >
              {" "}
              {children}
            </ItemSelectedResponseContext.Provider>
          </DeleteTodosResponseContext.Provider>
        </EditTodosResponseContext.Provider>
      </addTodosResponseContext.Provider>
    </>
  );
}

export default ContextShare;
