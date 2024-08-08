import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from '../pages/contexts/CurrentUserContext';
import axios from "axios";
import { removeTokenTimestamp } from "../pages/utils/Utils";
import { Navbar, Nav } from "react-bootstrap";

