import React, { useState } from 'react'
import './Admin.css'
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import db, { storage } from '../firebase/FirebaseConfig'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Loader from '../components/Loader/Loader';
function Admin() {
    const [ImageUpload, setImageUpload] = useState(null)
    const [inputData, setInputData] = useState({
        title: "",
        text: "",
        blogNumber: 0
    })
    const [load, setLoad] = useState(false)
    console.log(inputData)
    const navigate = useNavigate()

    const SentBlog = async (e) => {
        e.preventDefault()
        setLoad(true)
        UploadImage()

    }

    async function SendFirebase(imgLink) {

        if (inputData.title === "" || inputData.text === "" || inputData.blogNumber === 0) {
            alert("joylarni toldiring!")
        } else {
            await addDoc(collection(db, "blogs"), {
                title: inputData.title,
                text: inputData.text,
                blognumber: inputData.blogNumber,
                image: imgLink,
                imgFileName: ImageUpload.name

            });
            setLoad(false)
            navigate("/")
        }


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

                getDownloadURL(uploadTask.snapshot.ref).then((imgLink) => {
                    SendFirebase(imgLink)
                });
            }
        );
    }
    const GetImage = (e) => {
        setImageUpload(e.target.files[0])
        console.log(e.target.files[0])
    }
    return (
        <>{
            load ? <Loader /> : <form action="" onSubmit={SentBlog}>
                <label htmlFor="">Title</label>
                <input onChange={(e) => setInputData({ ...inputData, title: e.target.value })} className='input' type="text" placeholder='Title...' />

                <label htmlFor="">Text</label>
                <textarea name="" onChange={(e) => setInputData({ ...inputData, text: e.target.value })} placeholder='Text...' id="" cols="30" rows="10"></textarea>
                <label htmlFor="">Blog Number</label>
                <input type="number" onChange={(e) => setInputData({ ...inputData, blogNumber: e.target.value })} placeholder='Blog number...' />

                <input className="custom-file-input" type="file" onChange={GetImage} />

                <button>Add Blog</button>

            </form>

        }

        </>
    )
}

export default Admin