import React, { useState } from "react";
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBTextArea,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddProject = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState({
    title: "",
    catagorie: "",
    description: "",
    enverment: "",
    technologie: "",
    picturePath: null,
    video: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjects((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setProjects((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const createProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", projects.title);
    formData.append("catagorie", projects.catagorie);
    formData.append("description", projects.description);
    formData.append("enverment", projects.enverment);
    formData.append("technologie", projects.technologie);
    formData.append("picturePath", projects.picturePath);
    formData.append("video", projects.video);

    axios
      .post("/api/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate("/admin/dash");
        setProjects((prevProjects) => ({
          ...prevProjects,
          _id: response.data._id,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        }));
        setErrors({});
        alert("Project created successfully");
      })
      .catch((err) => {
        console.error(err); // log any errors to the console
        if (err.response && err.response.data) {
          const errResponse = err.response.data.errors;
          const errObj = {};
          for (const key of Object.keys(errResponse)) {
            errObj[key] = errResponse[key].message;
          }
          setErrors(errObj);
        }
      });
  };
  return (
    <>
    <h3>Add New Project</h3>
    <Link  className="btn btn-link" to="/admin/dash">Home🏠</Link>
      <MDBRow className='justify-content-center'>
<MDBCol md='6'>
<form onSubmit={createProject}>
  <label>Title</label>
<MDBInput
        
         name='title'
         value={projects.title}
         onChange={handleChange}
         
       />
       <p style={{color: 'red', backgroundColor: 'lime'}}>{errors.title}</p>
{errors.title && (
<MDBValidationItem
           invalid
           feedback={errors.title}
           feedbackType='invalid'
         />
)}
     <p style={{color: 'red', backgroundColor: 'lime'}}>{errors.catagorie}</p>
       <label>Category:</label>
  <select  name='catagorie' value={projects.catagorie} onChange={handleChange}>
    <option value="">--Please select a category--</option>
    <option value="Ai Project">AI Project</option>
    <option value="Machine Learning Project">Machine Learning Project</option>
    <option value="Industrial Automation Project"> Projects</option>
    <option value="Deep Learinng">Deep Learinng</option>
    <option value="Data Science">Data Science</option>
  </select>
      {errors.catagorie && (
        <MDBValidationItem
          invalid
          feedback={errors.catagorie}
          feedbackType='invalid'
        />
      )}
      <p style={{color: 'red', backgroundColor: 'lime'}}>{errors.description}</p>
      <label>Description</label>
      <MDBTextArea
        name='description'
        value={projects.description}
        onChange={handleChange}
      />
      {errors.description && (
        <MDBValidationItem
          invalid
          feedback={errors.description}
          feedbackType='invalid'
        />
      )}
      <p style={{color: 'red', backgroundColor: 'lime'}}>{errors.enverment}</p>
      <label>Enverment</label>
      <MDBTextArea
        name='enverment'
        value={projects.enverment}
        onChange={handleChange}     
           
      />
      {errors.enverment && (
        <MDBValidationItem
          invalid
          feedback={errors.enverment}
          feedbackType='invalid'
        />
      )}
      <p style={{color: 'red', backgroundColor: 'lime'}}>{errors.technologie}</p>
       <label>Technologie</label>
      <MDBTextArea
        name='technologie'
        value={projects.technologie}
        onChange={handleChange}
        
      />
      {errors.technologie && (
        <MDBValidationItem
          invalid
          feedback={errors.technologie}
          feedbackType='invalid'
        />
      )}
        <label htmlFor="">Project Image</label>
      <MDBInput
    
        type="file" 
        accept="image/*"
        name='picturePath'
        onChange={handleFileUpload}
      />
     
      <label htmlFor="">Project Video</label>
      <MDBInput
        type='text'
        name='video'
        value={projects.video}
        onChange={handleChange}
       
      /> 
       

      <input type='submit' className='mx-0'
       value="Submit" />    
    </form>
   
  </MDBCol>
</MDBRow>
</>
);
};

export default AddProject;