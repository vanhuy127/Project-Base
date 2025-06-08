import React, { type PropsWithChildren } from 'react'
import { useOutlet } from 'react-router-dom';

export const AdminLayout: React.FC<PropsWithChildren> = () => {
    const outlet = useOutlet();
    return (
        <div>
            <p>admin layout: </p>
            <div>{outlet}</div>
        </div>
    )
}
