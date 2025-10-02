// Main navigation bar

import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import ROUTES from './AppRouteNames';

// const NavItem: React.FC<{
//   to: string;
//   end?: boolean;
//   children: React.ReactNode | string;
// }> = ({ to, end, children }) => (
//   <Nav.Item>
//     <NavLink
//       className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
//       to={to}
//       end={end}
//     >
//       {children}
//     </NavLink>
//   </Nav.Item>
// );

// TODO: Clean this up and see if we can look through each item
const AppNavBar = (): ReactElement => (
  // <nav>
  //   <Nav>
  //     <NavItem to={ROUTES.HOME.route} end>
  //       {ROUTES.HOME.name}
  //     </NavItem>
  //     <NavItem to={ROUTES.VERSION.route}>{ROUTES.VERSION.name}</NavItem>
  //   </Nav>
  // </nav>
  <Navbar collapseOnSelect className='justify-content-between'>
    <Container>
      <Navbar.Brand>
        <Link to='/'>Keep Investigating Mysteries Files</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      {/* <Navbar.Collapse id='responsive-navbar-nav'> */}
      {/* <Nav className='me-auto'>
          <Nav.Link href='#pricing'>About</Nav.Link>
          <NavDropdown title='Cases' id='collapsible-nav-dropdown'>
            <NavDropdown.Item href='#action/3.1'>
              Eleanor Vance
            </NavDropdown.Item>
          </NavDropdown>
        </Nav> */}
      <Nav className='me-auto ' />
      <Link className='me-3 playNow btn btn-primary' to='/eleanor/'>
        Play now
      </Link>
      <Link to='about'>About</Link>
      {/* </Navbar.Collapse> */}
    </Container>
  </Navbar>
);

export default AppNavBar;
