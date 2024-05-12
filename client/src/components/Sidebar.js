import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdOutlineRoundaboutLeft } from "react-icons/md";


const SidebarContainer = styled.div`
  position: fixed;
  top: 72px; /* Adjust according to your Navbar height */
  left: 0;
  height: calc(100% - 60px); /* Subtract Navbar height from the total height */
  width: 150px;
  background-color: #2c3e50;
  color: #fff;
`;

const SidebarItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #fff;
  transition: background-color 0.3s ease-in-out;
  
  &:hover {
    background-color: #34495e;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem to="/tags"><FaHome /> Home</SidebarItem>
      <SidebarItem to="/"><FaArrowTrendUp /> Hot Topics</SidebarItem>
      
      <SidebarItem to="/about"><MdOutlineRoundaboutLeft /> About</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
