import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../../api/axiosDefaults"
//import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/Utils";