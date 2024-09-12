import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useParams } from 'react-router-dom';
import GoalsDesktop from './GoalsDesktop';

const Goals = () => {
    
    const currentUser = useCurrentUser();
    const { id } = useParams();

    return (
        <div>
            {currentUser ? (
                <>
                <div>
                    <h1>{currentUser.username} Goals </h1>
                </div>
                <div>
                    <GoalsDesktop id={id} />
                </div>
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