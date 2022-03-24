import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import { firebase } from "./firebase";

function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState("");

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

  const publicar = async (e) => {
    e.preventDefault();
    if (!tweet.trim()) {
      console.log("Está vacío");
      return;
    }
    try {
      const db = firebase.firestore();
      const nuevoTweet = {
        message: tweet,
      };
      const data = await db.collection("tweets").add(nuevoTweet);
      setTweet("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <Login />
      {/* <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tweets.map((tweet) => (
              <li className="list-group-item" key={tweet.id}>
                {tweet.message}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>Formulario</h3>
          <form onSubmit={publicar}>
            <input
              type="text"
              placeholder="Publicar tweet"
              className="form-control mb-2"
              onChange={(e) => setTweet(e.target.value)}
              value={tweet}
            />
            <button className="btn btn-dark btn-block" type="submit">
              Publicar
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}

export default App;
