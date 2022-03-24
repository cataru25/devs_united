import React, { useState, useEffect } from "react";
import { firebase } from "./firebase";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tweets").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTweets(arrayData);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tweets.map((tweet) => (
              <li className="list-group-item" key={tweet.id}>
                {tweet.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">Formulario</div>
      </div>
    </div>
  );
}

export default App;
