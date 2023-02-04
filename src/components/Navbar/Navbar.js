import React, { useState } from 'react'
import "./Navbar.css"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from '../../firebase/FirebaseConfig'
function Navbar() {
    const [googleData, setGoogleData] = useState({
        Name: "",
        Email: "",
        Img: "",
    })
    // console.log(googleData)
    const provider = new GoogleAuthProvider()
    const SignInWithGoogle = () => {
        signInWithPopup(auth, provider).then(res => {
            window.location.reload()
        }).catch(
            err => console.log("internet topilmadi.")
        )
    }


    const SIGNOUT = () => {
        signOut(auth)
        window.location.reload()
    }
    return (
        <div className='Navbar'>
            <h1>Logo</h1>
            <div className="">
                <h1>{localStorage.getItem("Name")}</h1>
                <h1>{localStorage.getItem("Email")}</h1>
                <img src={localStorage.getItem("Img")} width="100px" alt="" />
            </div>

            {localStorage.getItem("Email") === "" ? <button onClick={SignInWithGoogle}>Googledan ro'yxatdan o'tish</button> :
                <button onClick={SIGNOUT} >Sign Out</button>}
        </div>
    )
}

export default Navbar