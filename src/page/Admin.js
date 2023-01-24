import React from 'react'
import './Admin.css'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import db from '../firebase/FirebaseConfig'

function Admin() {
    const navigate = useNavigate()
    const SentBlog = async (e) => {
        e.preventDefault()
        let title = e.target[0].value
        let text = e.target[1].value
        let blogNumber = Number(e.target[2].value)
        if (title === "" || text === "" || blogNumber === 0) {
            alert("joylarni toldiringß")
        } else {
            await addDoc(collection(db, "blogs"), {
                title,
                text,
                blogNumber
            });
            e.target[0].value = ""
            e.target[1].value = ""
            e.target[2].value = ""
            navigate("/")
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