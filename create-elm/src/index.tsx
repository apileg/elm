import React from 'react'
import ReactDOM from 'react-dom/client'
import People from './People'

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    <React.StrictMode>
        <People />
    </React.StrictMode>
)
