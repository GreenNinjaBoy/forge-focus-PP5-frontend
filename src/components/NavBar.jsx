import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../pages/contexts/CurrentUserContext';
import axios from "axios";
import { removeTokenTimestamp } from "../pages/utils/Utils";
import { Navbar, Nav } from "react-bootstrap";

const Navbar = () => {

    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const handleSignout = async () => {
        try {
            await axios.post(`dj-rest-auth/logout/`);
            removeTokenTimestamp();
        } catch(err) {
            consolr.log(err)
        }
    }

    
}