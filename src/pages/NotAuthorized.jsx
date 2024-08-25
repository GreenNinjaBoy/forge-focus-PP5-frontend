import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const NotAuthorized = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>OOPS!!</h1>
            <h2>Its looks like you are not Authorised to access this page</h2>
            <p>If you are a User of Forge Focus please Sign In!</p>
            <p>If you are not a user please Sign up to use our features</p>

            <Button onClick={() => navigate('/signin')}>Sign In</Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
    )
}

export default NotAuthorized