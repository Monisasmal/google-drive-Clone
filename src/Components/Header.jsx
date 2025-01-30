import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";


const HeaderContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto 200px;
  align-items: center;
  padding: 5px 20px;
  height: 60px;
  
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 40px;
  }
  span {
    font-size: 22px;
    margin-left: 10px;
    color: gray;
  }
`;

const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  width: 700px;
  background-color: whitesmoke;
  padding: 12px;
  border-radius: 10px;
  input {
    background-color: transparent;
    border: 0;
    outline: 0;
    flex: 1;
  }
`;
const HeaderIcon = styled.div`
    display: flex;
    align-items: center;
    span {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    svg.MuiSvgIcon-root{
        margin: 0px 10px;
    }
        img{
        width: 40px;
        height:40px;
        }
`

const Header = ({photoURL}) => {
  return (
    <HeaderContainer>
      <HeaderLogo>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/da/Google_Drive_logo.png"
          alt="Google Drive"
        />
        <span>mDrive</span>
      </HeaderLogo>
      <HeaderSearch>
        <SearchIcon />
        <input type="text" placeholder="Search in Drive" />
        <FormatAlignCenterIcon />
      </HeaderSearch>
      <HeaderIcon>
        <span>
          <HelpOutlineIcon />
          <SettingsIcon />
        </span>
        <span>
          <AppsIcon />
          <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqSASwU9z6bhAb-NARIA5TJuClIuy28F5AHA&s"
          alt="Google Drive"
        />
        </span>
      </HeaderIcon>
    </HeaderContainer>
  );
};

export default Header;
