import React, { useEffect, useState } from "react";
import List from "./List";

const App = () => {
  const [Input, setinput] = useState("");
  const [item, setitem] = useState([]);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState();

  const getitem = async () => {
    try {
      const res = await fetch("https://my-to-do-back-end.vercel.app/api/v1/note/get-note");
      const data = await res.json();
      setitem(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getitem();
  }, []);

  const updategetitem = async (id) => {
    setId(id);
    setUpdate(true);
    try {
      const res = await fetch(
        `https://my-to-do-back-end.vercel.app/api/v1/note/updateget-note/${id}`
      );
      const data = await res.json();
      setinput(data.data[0].title);
    } catch (error) {
      console.log(error);
    }
  };

  const InputEvent = (event) => {
    setinput(event.target.value);
  };

  const createNote = async () => {
    try {
      const res = await fetch(`https://my-to-do-back-end.vercel.app/api/v1/note/create-note`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: Input }),
      });

      const data = await res.json();
      console.log(data);
      if (data.success) {
        getitem();
        setinput("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async () => {
    console.log("sf", id);
    try {
      const res = await fetch(
        `https://my-to-do-back-end.vercel.app/api/v1/note/update-note/${id} `,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: Input }),
        }
      );
      const data = await res.json();
      if (data.success) {
        getitem();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteNote = async (id) => {
    try {
      const res = await fetch(
        `https://my-to-do-back-end.vercel.app/api/v1/note/delete-note/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.success) {
        getitem();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="main h-screen w-screen flex items-center justify-center bg-green-300">
        <div className="main_div bg-white min-h-[450px] rounded-2xl shadow-2xl border-slate-950">
          <h1 className="mt-10 text-center h-14 bg-orange-300 pt-3 font-bold text-white text-2xl ">
            To-Do List
          </h1>
          <div className="flex mt-12 mx-8 items-center justify-between">
            <input
              type="text"
              placeholder="Add a Items"
              value={Input}
              className="outline-none w-[70%] border-b-2 border-slate-500 text-center"
              onChange={InputEvent}
            />
            <button
              onClick={update ? updateItem : createNote}
              className="h-14 w-14 
            rounded-full hover:bg-green-300 ml-8 pb-1
             bg-orange-300 text-center text-white font-extrabold text-3xl"
            >
              +
            </button>
          </div>
          <ol className="m-10 text-green-500 font-bold">
            {item.map((itevalue, index) => {
              return (
                <List
                  text={itevalue.title}
                  id={index}
                  key={index}
                  NoteId={itevalue._id}
                  updategetitem={() => updategetitem(itevalue._id)}
                  DeleteNote={() => DeleteNote(itevalue._id)}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};

export default App;
