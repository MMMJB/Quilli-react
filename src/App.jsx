import React from "react";
import { AuthProvider } from "./Contexts/AuthContext";

import Home from "./Pages/Home/Home";
import Signup from "./Pages/Login/Signup";
import Login from "./Pages/Login/Login";
import Documents from "./Pages/Documents/Documents";
import Editor from "./Pages/Editor/Editor";
import NotFound from "./Pages/404/NotFound";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";

export default function App() {
    return (<>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="*" element={<NotFound/>} />
                    <Route path="/documents" element={
                        <PrivateRoute>
                            <Documents />
                        </PrivateRoute>
                    } />
                    <Route path="/documents/:id" element={
                        <PrivateRoute>
                            <Editor />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    </>)
}