import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/vibehut-logo.png';
import * as ROUTES from '../../constants/routes';

const landing = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="vibehuticon"/>

    <h2><Link to={ROUTES.LOGIN}>login</Link></h2>

    <br></br>

    <h2><Link to={ROUTES.CREATEACCOUNT}>create new account</Link></h2>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default landing;