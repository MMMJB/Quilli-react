import React, { useEffect } from 'react'

import { useNavigate, generatePath } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid"

export default function NewDoc() {
    const navigate = useNavigate();

    useEffect(_ => {
        const documentId = uuidV4();
        navigate(`/documents/${documentId}`);
    }, []);

    return <span>Redirecting...</span>
}
