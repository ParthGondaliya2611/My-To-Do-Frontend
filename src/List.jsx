import React from "react";
import EditIcon from "@mui/icons-material/Edit";

const List = ({ text, DeleteNote,updategetitem }) => {
  return (
    <>
      <div className="flex items-center my-1 gap-2">
        <button onClick={updategetitem}>
          <EditIcon ></EditIcon>
        </button>
        <i
          class="text-red-500 fa-regular fa-circle-xmark cursor-pointer"
          onClick={DeleteNote}
        ></i>
        <li className="text-black">{text}</li>
      </div>
    </>
  );
};

export default List;
