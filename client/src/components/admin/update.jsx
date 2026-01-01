import React, { useState,useEffect } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import'../../status/css/updateForm.css'
const Update = () => {
  const { id } = useParams();
   
  const navigate=useNavigate();

  const [project, setProject] = useState({
    title: '',
    catagorie: '',
    description: '',
    enverment: '',
    technologie: '',
    picturePath:'',
    video:''
  });
  const[picturePath,setPicturePath]=useState()
  const [refresh, setRefresh] = useState(false);
  const handleFileUpload = (e) => {
  const { name, files } = e.target;
  // Only set the file object if a file is selected
  if (files.length) {
    setProject((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  }
};
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(()=>{
    axios.get('/api/projects/'+id)
    .then(res=>{console.log(res.data);
      setProject(res.data)
   
    })
    .catch(err=>console.log(err))
},[id,refresh])

const updateButton = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", project.title);
  formData.append("catagorie", project.catagorie);
  formData.append("description", project.description);
  formData.append("enverment", project.enverment);
  formData.append("technologie", project.technologie);
  formData.append("picturePath", project.picturePath);
  formData.append("video", project.video);
  axios
    .put(`/api/projects/${id}`, formData)
    .then((res) => {
      console.log(res.data);
      navigate("/admin/dash");
    })
    .catch((err) => console.log(err));
};

  return (
    < div className='update'>
      <h1>Update Project</h1>
      <Form onSubmit={updateButton}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={project.title} onChange={handleChange} />
          <label>Category:</label>
  <select  name='catagorie' value={project.catagorie} onChange={handleChange}>
    <option value="">--Please select a category--</option>
    <option value="Ai Project">AI Project</option>
    <option value="Machine Learning Project">Machine Learning Project</option>
    <option value="Industrial Automation Project">Industrial Automation Project</option>
    <option value="Deep Learinng">Deep Learinng</option>
    <option value="Data Science">Data Science</option>
  </select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" value={project.description} onChange={handleChange} />
          <Form.Label>Environment</Form.Label>
          <Form.Control as="textarea" rows={3}name="enverment" value={project.enverment} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Technologies Used</Form.Label>
          <Form.Control as="textarea" rows={3} name="technologie" value={project.technologie} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Project Image</Form.Label>
        <Form.Control type="file" name="picturePath" value={picturePath} onChange={handleFileUpload} /> 
        <Form.Label>Project Video</Form.Label>
        <Form.Control type="text" name="video" value={project.video} onChange={handleChange} />
        </Form.Group>
        <button type="submit" variant="outline-primary">Update Project</button>
      </Form>
      <Link className="btn btn-link" variant="outline-primary"  to="/admin/dash">Home🏠</Link>
    </div>
  );
};

export default Update;
