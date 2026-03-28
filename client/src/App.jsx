import { useEffect, useState } from "react";
import axios from "axios";
import style from "./App.module.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inp1, setInp1] = useState("");
  const [inp2, setInp2] = useState("");

  async function getData() {
    const response = await axios.get("http://localhost:3000/api/v1/task/");
    console.log(response.data);
    setTasks(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function createData() {
    const data = await axios.post("http://localhost:3000/api/v1/task/", {
      title: inp1,
      description: inp2,
      date: "2026-03-27",
      status: false,
    });
    console.log(data);
    getData();
  }

  return (
    <>
      <div className={style.inputsContainer}>
        <input
          className={style.inputTitle}
          onChange={(e) => setInp1(e.target.value)}
          placeholder="title"
        ></input>
        <input
          className={style.inputDescription}
          onChange={(e) => setInp2(e.target.value)}
          placeholder="description"
        ></input>
        <button onClick={createData}>Send</button>
      </div>
      <div className={style.tasksContainer}>
        {tasks.map((el) => (
          <div className={style.taskContainer}>
            <p className={style.title}>{el.title}</p> <hr />
            <p className={style.description}>{el.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
