import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig";
export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [getAdmin, setAdmin] = useState(false)
    let ADMIN = "kodirov8788@gmail.com" || "ahmadbekusmanov2000@gmail.com"
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.email === ADMIN) {
                setAdmin(true)
            } else {
                setAdmin(false)
            }
            if (user) {
                console.log('auth change : ', user)
                localStorage.setItem("Name", user.displayName)
                localStorage.setItem("Email", user.email)
                localStorage.setItem("Img", user.photoURL)
            } else {
                console.log("ro'yhatdan o'tish topilmadi.")
                localStorage.setItem("Name", "")
                localStorage.setItem("Email", "")
                localStorage.setItem("Img", "")
            }
        });
    }, [])



    return <AuthContext.Provider value={{ Name: "Sardor", getAdmin }}>{children}</AuthContext.Provider>
}



