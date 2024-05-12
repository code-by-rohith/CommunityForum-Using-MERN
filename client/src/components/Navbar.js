import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BsQuestionSquare } from "react-icons/bs";
import { IoGlobeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalPostOffice } from "react-icons/md";

const NavbarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #212e3d;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000; /* Ensure it's above other content */
`;

const Logo = styled.h1`
  color: #fff;
  margin: 0;
`;

const NavItemsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto; /* Push items to the right */
  margin-right: 70px; /* Add margin to the right side */
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 10px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0e87ea;
  }
`;

const ProfileIcon = styled(CgProfile)`
  font-size: 20px;
  margin-right: 0px;
  color: #fff;
`;

const Username = styled.span`
  color: #fff;
  font-weight: bold;
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-left: 20px;
  font-weight: bold;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0e87ea;
  }

  &:first-child {
    margin-left: 0; /* Remove left margin for the first link */
  }
`;

const QuestionLink = styled(NavLink)`
  display: flex;
  align-items: center;
`;

const QuestionIcon = styled(BsQuestionSquare)`
  font-size: 20px;
  margin-right: 5px;
  color: #fff;
`;

const PostIcon = styled(MdOutlineLocalPostOffice)`
  font-size: 20px; /* Adjust font size */
  margin-right: 5px;
  color: #fff;
`;

const Navbar = ({ username }) => {
  return (
    <NavbarContainer>
      <Logo><IoGlobeOutline /> Community Forum</Logo>
      <NavItemsContainer>
        {/* Profile icon and username */}
        <ProfileContainer>
          <ProfileIcon className='profile' />
          <ProfileLink ><Username className='usern'>{username}</Username></ProfileLink>
        </ProfileContainer>
        {/* Questions icon and link */}
        <QuestionLink to="/questions"><QuestionIcon className='quesone' /> Ask Questions</QuestionLink>
        {/* Other navigation links */}
        {/* Link to the About page */}
        <NavLink to="/request"><create><PostIcon className='ps' />  Post</create></NavLink>
      </NavItemsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
