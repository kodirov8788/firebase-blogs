import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestore } from "./firebase/FirebaseConfig";
function App() {
  const [data, setData] = useState([])
  console.log(data)
  useEffect(() => {
    const getData = async () => {
      let box = []
      let FirebaseData = await getDocs(collection(firestore, "blogs"))
      FirebaseData.forEach(doc => {
        return box.push(doc.data())
      })
      setData(box)
    }
    getData()

  }, [])


  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
