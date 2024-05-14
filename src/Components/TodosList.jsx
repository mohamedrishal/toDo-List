import React, { useContext, useState } from "react";
import { deleteTodosAPI, editTodosAPI } from "../Services/allAPI";
import {
  DeleteTodosResponseContext,
  EditTodosResponseContext,
  ItemSelectedResponseContext,
} from "../Context/ContextShare";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const TodosList = ({ todos }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { deleteTodosResponse, setDeleteTodosResponse } = useContext(
    DeleteTodosResponseContext
  );
  const { itemSelectedResponse, setItemSelectedResponse } = useContext(
    ItemSelectedResponseContext
  );

  const { editTodosResponse, setEditTodosResponse } = useContext(
    EditTodosResponseContext
  );

  const handleDelete = async (id) => {
    const token = sessionStorage.getItem("token");
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await deleteTodosAPI(id, reqHeader);
    if (result.status === 200) {
      alert("Deleted....");
      setDeleteTodosResponse(result.data);
    } else {
      alert(result.response.data);
    }
  };

  const itemSelect = (id) => {
    setItemSelectedResponse(id);
  };

  const [todosDetails, SetTodosDetails] = useState({
    todoName: todos.todoName,
    description: todos.description,
  });

  const handleUpdate = async (id) => {
    const { todoName, description } = todosDetails;
    if (!todoName || !description) {
      alert(`Please fill form Completely`);
    } else {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };
      console.log(id);
      // api call
      const result = await editTodosAPI(id, todosDetails, reqHeader);
      if (result.status === 200) {
        handleClose();
        // pass response to my projects
        setEditTodosResponse(result.data);
      } else {
        console.log(result);
        alert(result.response.data);
      }
    }
  };

  return (
    <div
      onClick={() => itemSelect(todos?._id)}
      style={{ width: "18rem", borderRadius: "20% 0% 20% 0%" }}
      className="btn border bg-light p-3 d-flex justify-content-between align-items-center m-2 shadow"
    >
      {todos.todoName}
      <div>
        <div
          onClick={handleShow}
          className="btn rounded-circle border-1 border-success me-2"
        >
          <i class="fa-solid fa-pen-to-square text-info"></i>   
        </div>
        <div
          onClick={() => handleDelete(todos._id)}
          className="btn rounded-circle border-1 border-danger"
        >
          <i class="fa-solid fa-trash text-danger"></i>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit ToDos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Give a Unique Name
          <Form.Control
            className="mt-2"
            size="lg"
            type="text"
            placeholder="Name"
            value={todosDetails.todoName}
            onChange={(e) =>
              SetTodosDetails({
                ...todosDetails,
                todoName: e.target.value,
              })
            }
          />
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={todosDetails.description}
              onChange={(e) =>
                SetTodosDetails({
                  ...todosDetails,
                  description: e.target.value,
                })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdate(todos._id)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodosList;
