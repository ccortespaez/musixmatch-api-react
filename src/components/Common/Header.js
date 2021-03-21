import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core';
import logo from './../../assets/img/logo.png';

const Header = () => (
   <AppBar position="sticky">
       <Toolbar>
           <img src={logo} alt="logo" width="32" height="30"></img>
           <h1>Musixmatch API with React</h1>
       </Toolbar>
   </AppBar>
)
export default Header;