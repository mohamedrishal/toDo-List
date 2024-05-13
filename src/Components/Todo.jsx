import React from "react";

const Todo = () => {
  return (
    <div>
      <h1
        style={{
          fontFamily: "Edu TAS Beginner",
          borderRadius: "20% 0% 20% 0%",
        }}
        className=" mb-2 p-3  shadow border  fw-bolder fs-2"
      >
        Task Name 📌
      </h1>

      <div data-mdb-input-init className="form-outline mt-3  ">
        <textarea style={{resize: "none"}} className="form-control" id="form7Example7" rows="16"></textarea>
      </div>
    </div>
  );
};

export default Todo;
