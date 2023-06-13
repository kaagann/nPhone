import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function PageAnimation({ children, image, name, bgcolor }) {
    const [animation, setAnimation] = useState(false);

    useEffect(() => {
        const doAnimation = () => {
            setAnimation(true);
            setTimeout(() => {
                setAnimation(false);
            }, 1000);
        };

        doAnimation();
    }, []);
    return <>{children}</>;
}

export default PageAnimation;
