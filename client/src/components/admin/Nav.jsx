import React,{useState} from 'react'
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
   
    MDBCollapse,
  } from 'mdb-react-ui-kit';
  import { useNavigate,Link} from "react-router-dom";


const Nav=({logoutHandler})=> {
    const [showBasic, setShowBasic] = useState(false);
  


 
  return (
    <div>
      <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
      <Link to="/">  <MDBNavbarBrand >Keraani Naceur</MDBNavbarBrand></Link>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <Link to="/">   <MDBNavbarLink active aria-current='page'>
                Home
              </MDBNavbarLink></Link>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink ><Link to="/add"> Add new project</Link></MDBNavbarLink>
            </MDBNavbarItem>

          </MDBNavbarNav>
         
      <button  onClick={logoutHandler} className='button'><i className="ri-logout-box-r-line"></i></button> <span></span>
  

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  
    </div>
  )
}

export default Nav