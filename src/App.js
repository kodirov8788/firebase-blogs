import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db, { storage } from "./firebase/FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";

function App() {
  const [data, setData] = useState([])

  const [updateTitle, setUpdateTitle] = useState("")

  // console.log(data)
  useEffect(() => {
    const getData = async () => {
      let box = []
      let FirebaseData = await getDocs(collection(db, "blogs"))
      FirebaseData.forEach(doc => {
        return box.push({ data: doc.data(), id: doc.id })
      })
      setData(box)
    }
    getData()

  }, [])
  // console.log(first)


  const deleteBlog = async (docs) => {
    deleteStorageImage(docs.data.imgFileName)
    await deleteDoc(doc(db, "blogs", docs.id));
    // console.log(docs.data.imgFileName)
    window.location.reload()
  }
  const titleUpdate = async (id) => {

    const Update = doc(db, "blogs", id);

    await updateDoc(Update, {
      title: updateTitle
    });
    window.location.reload()

  }


  const deleteStorageImage = async (imgDelete) => {
    const desertRef = ref(storage, `images/${imgDelete}`);
    console.log(imgDelete)
    await deleteObject(desertRef).then((del) => {
      console.log("del : ", del)
    }).catch((error) => {
      console.log("error chiqdi", error)
    });
  }
  return (
    <div className="App">
      <a href="admin">Admin Page</a>
      <div>
        {
          data.map((doc, inx) => (
            <div className="blog" key={inx}>
              <img src={doc.data.image} alt="" />
              <h1>{doc.data.title}</h1>
              <p>{doc.data.text}</p>
              <h3>{doc.data.blogNumber}</h3>

              <input type="text" placeholder="update title"
                onChange={(e) => setUpdateTitle(e.target.value)} />

              <button onClick={() => titleUpdate(doc.id)}>Update Blog</button>

              <button onClick={() => deleteBlog(doc)}>Delete blog</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
