import { useEffect, useState } from "react";
import "./App.scss";
import axios from 'axios'

function App() {

  const [tasks, setTasks] = useState([])
  const [inp1, setInp1] = useState('')
  const [inp2, setInp2] = useState('')

  async function getData() {
    const response = await axios.get('http://localhost:3000/api/v1/task/')
    console.log(response.data);
    setTasks(response.data)
  }

  useEffect(() => {
    getData()
  }, [])

  async function createData() {
    const data = await axios.post('http://localhost:3000/api/v1/task/',
      {
        "title": inp1,
        "description": inp2,
        "date": "2026-03-27",
        "status": false
      }
    )
    console.log(data);
    getData()
  }

  return (

    <>
      <button onClick={createData}>Send</button>
      <input onChange={(e) => setInp1(e.target.value)} placeholder="title"></input>
      <input onChange={(e) => setInp2(e.target.value)} placeholder="description"></input>
      <div>
        {tasks.map((el) => <div><p>{el.title}</p> <p>{el.description}</p><hr /></div>)}
      </div>

    </>
  );
}

export default App;
