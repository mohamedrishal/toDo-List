import React, { useEffect } from "react";
import Todo from "../Components/Todo";
import TodosList from "../Components/TodosList";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [username, setUsername] = useState("");

  const [projectDetails, SetProjectDetails] = useState({
    todoName: "",
    description: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("exstingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("exstingUser")).username);
    }
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const { todoName, description } = projectDetails;
    if (!todoName || !description) {
      toast.info("Please Fill the Form");
    } else {
      const reqBody = new FormData();

      reqBody.append("todoName", todoName);
      reqBody.append("description", description);

      if (token) {
        const reqHeader = {
          "Authorization": `Bearer ${token}`,
        };

        const result = await addProjectAPI(reqBody, reqHeader);
        if (result.status === 200) {
          console.log(result.data);
          handleClose();
          alert("Project Added");
          // setAddProjectResponse(result.data)
        } else {
          console.log(result);
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
            <TodosList />
          </div>
        </div>

        <div className="col-lg-9   bg-success-subtle">
          <div className="text-end px-5 mt-4  fw-bold">
            <button className=" btn btn-outline-danger">
              <i class="fa-solid fa-right-from-bracket"></i> LogOut{" "}
            </button>
          </div>
          <div className="p-5">
            <Todo />
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
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
