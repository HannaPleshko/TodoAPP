import { useEffect, useState } from "react";
import "./App.scss";
import axios from 'axios'

function App() {

  const [tasks, setTasks] = useState([])

  async function getData(){
    const response = await axios.get('http://localhost:3000/api/v1/task/')
    console.log(response.data);
    setTasks(response.data)
  }

  useEffect(()=>{
      getData()
  },[])

  return (

    <>
      <div>
        {tasks.map((el) => <div><p>{el.title}</p> <p>{el.description}</p><hr/></div>)}
      </div>
      
    </>
  );
}

export default App;
