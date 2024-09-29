import { useState, useEffect } from 'react';
import DesktopGoalsArea from './DesktopGoalsArea';
import MobileGoalsArea from './MobileGoalsArea';

const GoalsArea = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);
            console.log('Is mobile:', mobile, 'Window width:', window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    console.log('Rendering GoalsArea, isMobile:', isMobile);

    return (
        <div style={{border: isMobile ? '5px solid blue' : '5px solid green'}}>
            {isMobile ? <MobileGoalsArea /> : <DesktopGoalsArea />}
        </div>
    );
};

export default GoalsArea;