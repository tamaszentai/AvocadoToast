/*global chrome*/
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter, Routes, Route } from 'react-router-dom';
import BookmarkInfo from "./routes/BookmarkInfo.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/bookmark/:bookmarkId" element={<BookmarkInfo />} />
            </Routes>
        </HashRouter>
    </StrictMode>,
);