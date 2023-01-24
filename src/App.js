import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import db from "./firebase/FirebaseConfig";
function App() {
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() => {
    const getData = async () => {
      let box = []
      let FirebaseData = await getDocs(collection(db, "blogs"))
      FirebaseData.forEach(doc => {
        return box.push(doc.data())
      })
      setData(box)
    }
    getData()

  }, [])


  return (
    <div className="App">
      <a href="admin">Admin Page</a>
      <div>
        {
          data.map((doc, inx) => (
            <div className="" key={inx}>
              <h1>{doc.Title}</h1>
              <h2>{doc.username}</h2>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
