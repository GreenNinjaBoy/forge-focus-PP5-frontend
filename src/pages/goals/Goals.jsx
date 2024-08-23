import { useCurrentUser } from '../contexts/CurrentUserContext';
import { useParams } from 'react-router-dom';
import GoalsDesktop from './GoalsDesktop';

const Goals = () => {
    
    const currentUser = useCurrentUser();
    const { id } = useParams();

    return (
        <div>
            {currentUser ? (
                <>
                <div>{currentUser.username} Goals</div>
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