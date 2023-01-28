import React, { useState } from 'react'
import './Admin.css'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import db, { storage } from '../firebase/FirebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Admin() {
    const [ImageUpload, setImageUpload] = useState(null)
    const [ImgUrl, setImgUrl] = useState("")
    console.log(ImageUpload)
    const navigate = useNavigate()

    const SentBlog = async (e) => {
        e.preventDefault()

        UploadImage()

        let title = e.target[0].value
        let text = e.target[1].value
        let blogNumber = Number(e.target[2].value)
        console.log(e.target)

        await SendFirebase(title, text, blogNumber, ImgUrl)




    }

    function SendFirebase(title, text, blogNumber) {

        setTimeout(async function () {
            if (title === "" || text === "" || blogNumber === 0 || ImgUrl === "") {
                alert("joylarni toldiringß")
            } else {
                await addDoc(collection(db, "blogs"), {
                    title,
                    text,
                    blogNumber,
                    ImgUrl
                });
                // e.target[0].value = ""
                // e.target[1].value = ""
                // e.target[2].value = ""
                navigate("/")

            }
        }, 3000)


    }

    function UploadImage() {
        const storageRef = ref(storage, `images/${ImageUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRef, ImageUpload);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {

                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL);
                });
            }
        );
    }
    const GetImage = (e) => {
        setImageUpload(e.target.files[0])
    }
    return (
        <form action="" onSubmit={SentBlog}>
            <label htmlFor="">Title</label>
            <input className='input' type="text" placeholder='Title...' />
            <label htmlFor="">Text</label>
            <textarea name="" placeholder='Text...' id="" cols="30" rows="10"></textarea>
            <label htmlFor="">Blog Number</label>
            <input type="number" placeholder='Blog number...' />

            <input className="custom-file-input" type="file" onChange={GetImage} />


            <div className="input_file">
                <input type="file" name="" id="" />
            </div>

            <button>Add Blog</button>
        </form>
    )
}

export default Admin