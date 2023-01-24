import React from 'react'
import './Admin.css'
import { collection, addDoc } from "firebase/firestore";
import db from '../firebase/FirebaseConfig'
function Admin() {

    const SentBlog = async (e) => {
        e.preventDefault()
        let title = e.target[0].value
        let text = e.target[1].value
        let blognumaber = Number(e.target[2].value)

        if (title === "" || text === "" || blognumaber === 0) {

            alert("joylarni toldir tvar")

        } else {
            await addDoc(collection(db, "blogs"), {
                title,
                text,
                blognumaber

            });
            e.target[0].value = ""
            e.target[1].value = ""
            e.target[2].value = ""
        }
    }

    return (
        <form action="" onSubmit={SentBlog}>
            <label htmlFor="">Title</label>
            <input className='input' type="text" placeholder='Title...' />
            <label htmlFor="">Text</label>
            <textarea name="" placeholder='Text...' id="" cols="30" rows="10"></textarea>
            <label htmlFor="">Blog Number</label>
            <input type="number" placeholder='Blog number...' />
            <button>Add Blog</button>
        </form>
    )
}

export default Admin