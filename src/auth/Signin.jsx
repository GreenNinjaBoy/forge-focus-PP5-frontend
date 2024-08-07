import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../utils/Utils";

function SignIn() {
    const navigate = useNavigate();
    const setCurrentUser = useSetCurrentUser();
    const [signInData, setSignInData] = useState({ username: '', password: '' });
    const [errors,setErrors] = useState({});

    const handleChange = (event) => {
        setSignInData({
            ...signInData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axios.post(`/dj-rest-auth/login/`, signInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            navigate.push('/goals');
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data || {});
        }
    };