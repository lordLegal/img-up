//import React from 'react';
//import axios from 'axios';

function Logout() {
    if(localStorage.getItem('jwt') != null) {
        localStorage.removeItem('jwt');
    }
    window.location.href = '/login'
}

export default Logout;