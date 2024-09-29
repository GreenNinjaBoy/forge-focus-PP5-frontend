import { useState, useEffect } from 'react';
import DesktopGoalsArea from './DesktopGoalsArea';
import MobileGoalsArea from './MobileGoalsArea';
console.log('MobileGoalsArea imported successfully');

const GoalsArea = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const mobile = width <= 768;
            console.log(`Window resized. Width: ${width}, Should be mobile: ${mobile}`);
            setWindowWidth(width);
            setIsMobile(mobile);
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Call it immediately to set initial state
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        console.log(`isMobile changed to: ${isMobile}`);
    }, [isMobile]);

    console.log(`Rendering GoalsArea. isMobile: ${isMobile}, windowWidth: ${windowWidth}`);

    if (isMobile) {
        console.log('About to render MobileGoalsArea');
        return <MobileGoalsArea />;
    } else {
        console.log('About to render DesktopGoalsArea');
        return <DesktopGoalsArea />;
    }
};

export default GoalsArea;