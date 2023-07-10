import React from 'react'

import { useAuth } from '../../Contexts/AuthContext'

export default function AccountProfilePicture() {
    const { currentUser } = useAuth();

    const updateProfilePicture = _ => {
        console.log("update my darn pfp!")
    }

    return (<>
        <img className="w-14 mx-8 my-6 aspect-square rounded-full shadow-lg" src="https://picsum.photos/100/100" alt="Profile" />
        <span onClick={updateProfilePicture} className="material-symbols-outlined grid place-items-center text-lg/[1px] text-editor-lgt absolute left-16 top-14 p-1 aspect-square rounded-full bg-white/75 cursor-pointer">photo_camera</span>
    </>)
}
