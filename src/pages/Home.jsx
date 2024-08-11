import React from "react";
import { Link } from "react-router-dom";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import About from "./About";

const Home = () => {

    const currentUser = useCurrentUser();

    const signedOutButtons  = (
        <>
        <Link to={'/signup'}>
        Ready To Forge?</Link></>
    )
}

export default Home