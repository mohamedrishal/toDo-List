import React, { useContext, useEffect } from "react";
import Todo from "../Components/Todo";
import TodosList from "../Components/TodosList";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { addTodosAPI, userTodosAPI } from "../Services/allAPI";
import { DeleteTodosResponseContext, EditTodosResponseContext, ItemSelectedResponseContext, addTodosResponseContext } from "../Context/ContextShare";

const Home = () => {
  const [show, setShow] = useState(false);


  const {addTodosResponse,setAddTodosResponse} = useContext(addTodosResponseContext)
  const { deleteTodosResponse, setDeleteTodosResponse} = useContext(DeleteTodosResponseContext)

  const {itemSelectedResponse, setItemSelectedResponse } = useContext(ItemSelectedResponseContext)

  const { editTodosResponse, setEditTodosResponse } = useContext(
    EditTodosResponseContext
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState("");

  const [todosDetails, SetTodosDetails] = useState({
    todoName: "",
    description: "",
  });

  const [userTodos, setUserTodos] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("exstingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("exstingUser")).username);
    }
  }, []);

  const [token, setToken] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);

  const getUserProjects = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await userTodosAPI(reqHeader);
      if (result.status === 200) {
        setUserTodos(result.data);
      } else {
        alert(result.response.data);
      }
    }
  };

  useEffect(() => {
    getUserProjects();
  }, [addTodosResponse,deleteTodosResponse,editTodosResponse]);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { todoName } = todosDetails;
    if (!todoName) {
      alert("Please Fill the Form");
    } else {
      if (token) {
        const reqHeader = {
          Authorization: `Bearer ${token}`,
        };

        const result = await addTodosAPI(todosDetails, reqHeader);
        if (result.status === 200) {
          console.log(result.data);
          handleClose();
          alert("Project Added");
          SetTodosDetails({
            todoName: "",
            description: "",
          });
          setAddTodosResponse(result.data)
          handleClose();
        } else {
          alert(result);
          console.log(result.response.data);
        }
      }
    }
  };


 

  return (
    <div>
      <div className="row" style={{ width: "100%", height: "100vh" }}>
        <div className="col-lg-3 ">
          <div className="bg-success-subtle d-flex flex-column w-100 align-items-center justify-content-center p-3  shadow">
            <button
              onClick={handleShow}
              className="rounded-circle p-2  btn btn-outline-success px-2 d-flex flex-column align-items-center my-3"
            >
              <i class="fa-solid fa-folder-plus"></i> ToDo
            </button>
            <h5>Name: {username}</h5>
          </div>

          <hr className="m-0" />

          <div
            style={{ overflowY: "auto", maxHeight: "100%", height: "76vh" }}
            className="p-3 bg-success-subtle w-100 shadow"
          >
            {userTodos?.length > 0 ? (
              [...userTodos].reverse()
              ?.map((todos, index) => (
                <TodosList
                 
                  key={index}
                  todos={todos}
                />
              ))
            ) : (
              <p className="text-danger fw-bolder fs-5 mt-2">
                No Projects Uploaded Yet!!
              </p>
            )}
          </div>
        </div>

        <div className="col-lg-9   bg-success-subtle">
          <div className="text-end px-5 mt-4  fw-bold">
            <button  className=" btn btn-outline-danger">
              <i class="fa-solid fa-right-from-bracket"></i> LogOut{" "}
            </button>
          </div>
          <div className="p-5">
            {userTodos?.map((item, index) =>
              itemSelectedResponse === null && index === 0 ? (
                <div key={item.id} style={{height:'60vh'}} className="d-flex flex-column justify-content-center align-items-center">
                  <h1>
                    <i className="fa-regular fa-file-excel fs-1"></i>
                  </h1>
                  Empty
                </div>
              ) : (
                itemSelectedResponse === item?._id && <Todo item={item} />
              )
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose} centered animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>ToDo</Modal.Title>
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
          <Button variant="primary" onClick={handleAdd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
