"use client"

import { BrowserRouter } from 'react-router-dom'


const ReactRouterWrapper = ({ children }: any) => {

    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    )
}

export default ReactRouterWrapper