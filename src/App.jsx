import React from "react";
import Home from "./Pages/Home/Home";
import Editor from "./Pages/Editor/Editor";
import NotFound from "./Pages/404/NotFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
    return (<>
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/app" element={<Editor/>} />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </Router>
    </>)
}