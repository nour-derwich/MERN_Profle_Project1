import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Projects from './projects'
import { useNavigate} from 'react-router-dom';
const Main=(props)=> {
  const [isloading,setIsloading]=useState(true)
    const [projects,setProjects]=useState([])
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate()
   
    useEffect(()=>{
      
      axios.get("/api/projects")
      .then(res=>{
        setProjects(res.data)
          setIsloading(false)
          refresh(true)
      })
      .catch(err=>console.log("err",err))
      
  },[refresh])
  if (isloading){
    return <h2>🧨🎇loading.....</h2>
}

  return (
    <>
<Projects projects={projects} setRefresh={setRefresh} refresh={refresh} setProjects={setProjects} />
    </>
  )
}

export default Main