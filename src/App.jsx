import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login/index";
import Navbar from "./components/Navbar/index";
import { firebase } from "./firebase";

function App() {
  const [tweets, setTweets] = useState([]);
  const [id, setId] = useState("");
  const [tweet, setTweet] = useState("");
  const [like, setLike] = useState(0);
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("tweets").get();
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(arrayData);
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
        like: like,
      };
      const data = await db.collection("tweets").add(nuevoTweet);

      setTweets([...tweets, { ...nuevoTweet, id: data.id }]);
      setTweet("");
    } catch (error) {
      console.log(error);
    }
    console.log(tweet);
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("tweets").doc(id).delete();

      const arrayFiltrado = tweets.filter((item) => item.id !== id);
      setTweets(arrayFiltrado);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTweet(item.message);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!tweet.trim()) {
      console.log("Vacío");
      return;
    }
    try {
      const db = firebase.firestore();
      await db.collection("tweets").doc(id).update({
        message: tweet,
      });
      const arrayEditado = tweets.map((item) =>
        item.id === id ? { id: item.id, message: tweet, like: item.like } : item
      );
      setTweets(arrayEditado);
      setModoEdicion(false);
      setTweet("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router>
      <div className="container mt-3">
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/welcome">
            <Navbar />
          </Route>
          <Route path="/feed">
            <Navbar />
          </Route>
          <Route path="/user">
            <Navbar />
          </Route>
        </Switch>
        {/* <div className="row">
        <div className="col-md-6">
          <ul className="list-group">
            {tweets.map((tweet) => (
              <li className="list-group-item" key={tweet.id}>
                {tweet.message}
                <button
                  className="bbtn btn-danger btn-sm float-right"
                  onClick={() => eliminar(tweet.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bbtn btn-warning btn-sm float-right mr-2"
                  onClick={() => activarEdicion(tweet)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h3>{modoEdicion ? "Editar tarea" : "Agregar tarea"}</h3>
          <form onSubmit={modoEdicion ? editar : publicar}>
            <input
              type="text"
              placeholder="Publicar tweet"
              className="form-control mb-2"
              onChange={(e) => setTweet(e.target.value)}
              value={tweet}
            />
            <button
              className={
                modoEdicion
                  ? "btn btn-warning btn-block"
                  : "btn btn-dark btn-block"
              }
              type="submit"
            >
              {modoEdicion ? "Editar" : "Publicar"}
            </button>
          </form>
        </div>
      </div> */}
      </div>
    </Router>
  );
}

export default App;
