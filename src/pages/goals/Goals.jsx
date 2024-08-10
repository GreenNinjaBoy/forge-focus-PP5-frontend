import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom';

const Goals = () => {
    
    const currentUser = useCurrentUser();
    const { id } = useParams();

    return (
        <div>
            {currentUser ? (
                <>
                <div>{currentUser.username}'s Goals</div>
                </>
            ) : (
                <div>
                    Fetching Goals information......
                </div>
            )}
        </div>
    )
}

export default Goals