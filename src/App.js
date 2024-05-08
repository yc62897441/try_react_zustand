// 套件
import React from 'react'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'

// 靜態資源
import './index.css'

// 自定義 components
import HomePage from './containers/HomePage.jsx'

// 自定義函數 or 參數

function App({}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
