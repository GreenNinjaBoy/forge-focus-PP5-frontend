import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Form, Button} from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../utils/Utils";