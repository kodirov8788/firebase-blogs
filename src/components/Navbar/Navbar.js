import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from '../../firebase/FirebaseConfig'
import { AuthContext } from '../../context/AuthContext'
function Navbar() {

    const { getAdmin } = useContext(AuthContext)

    const [googleData, setGoogleData] = useState({
        Name: "",
        Email: "",
        Img: "",
    })
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

            {getAdmin ? <a href="/admin">Admin</a> : ""}
        </div>
    )
}

export default Navbar