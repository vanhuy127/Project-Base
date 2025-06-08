import Header from '@/components/header';
import React, { type PropsWithChildren } from 'react'
import { useOutlet } from 'react-router-dom';

export const DefaultLayout: React.FC<PropsWithChildren> = () => {
    const outlet = useOutlet();
    return (
        <div>
            <Header />
            <div>{outlet}</div>
        </div>
    )
}
