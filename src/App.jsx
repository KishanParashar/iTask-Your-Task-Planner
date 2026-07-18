import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import { CiEdit } from "react-icons/ci";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useEffect, useState } from "react"
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";

function App() {



  const [todo, settodo] = useState("")
  const [todos, settodos] = useState(() => {
    return JSON.parse(localStorage.getItem("todos")) || []
  })
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let ts = JSON.parse(localStorage.getItem("todos")) || []
    settodos(ts)
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  //  const saveToLocalStorage=()=>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  //  }

  const toglefinished = (e) => {
    setshowfinished(!showfinished)
  }

  const handeledit = (e, id) => {
    let t = [...todos].filter(i => i.Id == id)
    settodo(t[0].todo)

    let newtodo = [...todos].filter(i => i.Id != id)
    settodos(newtodo)
    // saveToLocalStorage()
  }

  const handledelete = (e, id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    let newtodos = [...todos].filter(item => {
      return item.Id != id;
    });
    settodos(newtodos);
    // saveToLocalStorage()
  }

  const handeleadd = () => {
    settodos([...todos, { Id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    toast('Task added successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
    // saveToLocalStorage()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handelecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.Id == id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
  }

  return (
    <>
       <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
      <Navbar />

      <div className="mx-4 md:container md:mx-auto my-5 bg-violet-200 rounded-xl p-5 min-h-[75vh] md:w-1/2 overflow-auto mb-14">
        <h1 className=" font-bold text-xl text-center">iTask - Manage your todos at one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handlechange} value={todo} className="bg-white w-full rounded-lg px-5 py-1" type="text" />
          <button onClick={handeleadd} disabled={todo.length <= 3} className="bg-violet-800 disabled:bg-violet-500 rounded-md font-bold  px-1.5 py-0.5 hover:bg-violet-950">Save</button>
        </div>
        <input onClick={toglefinished} checked={showfinished} type="checkbox" />Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>
        {todos.length == 0 && <div className="m-5">No Todos to Display</div>}
        {todos.map(item => {
          return (showfinished || !item.isCompleted) && <div key={item.Id} className="todos md:w-1/2">
            <div className="todo flex w-full justify-between my-2">
              <div className=" flex gap-4">
                <input name={item.Id} onClick={handelecheckbox} type="checkbox" checked={item.isCompleted} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="button flex h-full">
                <button onClick={(e) => { handeledit(e, item.Id) }} className="bg-violet-800 rounded-md font-bold mx-1 px-1.5 py-0.5 hover:bg-violet-950"><CiEdit /></button>
                <button onClick={(e) => { handledelete(e, item.Id) }} className="bg-violet-800 rounded-md font-bold mx-1 px-1.5 py-0.5 hover:bg-violet-950"><MdDelete /></button>
              </div>

            </div>
          </div>
        })}

      </div>
      <Footer />
    </>
  )
}

export default App