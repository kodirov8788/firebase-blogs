import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./firebase/FirebaseConfig";
function App() {
  const [data, setData] = useState([])

  const [updateTitle, setUpdateTitle] = useState("")

  console.log(data)
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

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    window.location.reload()
  }
  const titleUpdate = async (id) => {

    const Update = doc(db, "blogs", id);

    await updateDoc(Update, {
      title: updateTitle
    });
    window.location.reload()

  }
  return (
    <div className="App">
      <a href="admin">Admin Page</a>
      <div>
        {
          data.map((doc, inx) => (
            <div className="blog" key={inx}>
              <h1>{doc.data.title}</h1>
              <p>{doc.data.text}</p>
              <h3>{doc.data.blogNumber}</h3>

              <input type="text" placeholder="update title"
                onChange={(e) => setUpdateTitle(e.target.value)} />

              <button onClick={() => titleUpdate(doc.id)}>Update Blog</button>

              <button onClick={() => deleteBlog(doc.id)}>Delete blog</button>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
