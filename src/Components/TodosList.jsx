import React from "react";

const TodosList = () => {

    

  return (
    <div
      style={{ width: "18rem", borderRadius: "20% 0% 20% 0%" }}
      className="btn border bg-light p-3 d-flex justify-content-between align-items-center m-2 shadow"
    >
      Task Name
      <div>
        <div className="btn rounded-circle border-1 border-success me-2">
          <i class="fa-regular fa-floppy-disk text-success fs-5"></i>
        </div>
        <div className="btn rounded-circle border-1 border-danger">
          <i class="fa-solid fa-trash text-danger"></i>
        </div>
      </div>
    </div>
  );
};

export default TodosList;
