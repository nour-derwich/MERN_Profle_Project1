import React, { useState } from 'react';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import '../../status/css/button.css';

const Projects = ({ projects, setProjects, refresh, setRefresh }) => {
  const navigate = useNavigate();
  const [projectModal, setProjectModal] = useState({});

  const toggleShow = (projectId) => {
    setProjectModal((prevModal) => ({
      ...prevModal,
      [projectId]: !prevModal[projectId],
    }));
  };
  
  const handleClose = (projectId) => {
    setProjectModal((prevModal) => ({
      ...prevModal,
      [projectId]: false,
    }));
  };
  
  const deleteHandler = (id) => {
    setRefresh(!refresh);
    axios
      .delete(`/api/projects/${id}`)
      .then((res) => {
        console.log(res.data);
        console.log('delete success ✅');
        setRefresh(true);
        navigate('/admin/dash');
        setProjects(projects.filter((project) => project._id !== id));
      })
      .catch((err) => {
        console.log('❌❌', err);
      });
  };

  return (
    <div>
      <MDBTable align='middle'>
        <MDBTableHead>
          <tr>
            <th scope='col'>Title Project</th>
            <th scope='col'>Video</th>
            <th scope='col'>Categorie</th>
            <th scope='col'>Description</th>
            <th scope='col'>Environment</th>
            <th scope='col'>Technologie Used</th>
            <th scope='col'>Actions</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>
                <div className='d-flex align-items-center'>
                  <img
                    src={project.picturePath}
                    alt='imagePlaceholder'
                    style={{ width: '100px', height: '100px' }}
                  />
                  <div className='ms-3'>
                    <p className='text-muted mb-0'>{project.title}</p>
                  </div>
                </div>
              </td>
              <td>
                <div className='d-flex align-items-center'>
                  <iframe
                    width='100%'
                    height='100%'
                    src={`https://www.youtube.com/embed/${project.video}`}
                    title='YouTube video player'
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              </td>
              <td>
                <div className='ms-3'>{project.catagorie}</div>
              </td>
              <td>
                <div className='box'>
                  <button className='button' onClick={() => toggleShow(project._id)}>
                    See Description <i className='ri-search-eye-line'></i>
                  </button>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <MDBModal show={projectModal[project._id]} onHide={() => handleClose(project._id)} tabIndex='-1'>

                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>{project.title}</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={() => toggleShow(project._id)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                          <p>{project.description}</p>
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={() => handleClose(project._id)}>
  Close
</MDBBtn>

                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </td>
                <td>{project.enverment}</td>
                <td>{project.technologie}</td>
                <td>
                  <Link className='btn btn-info' to={`/update/${project._id}`} onClick={() => toggleShow(project._id)}>
                    Edit
                  </Link>
                  <button className='btn btn-danger' onClick={() => deleteHandler(project._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
        <div />
        <div />
      </div>
    );
  };
  
  export default Projects;
  