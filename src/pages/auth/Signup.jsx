import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { axios } from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = () => {

    const [signupData, setSignUpData] = useState({
        username:'',
        email: '',
        password1: '',
        password2:""
    });
}


