import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Components/Card";
import Loader from "./Components/Loader";

function Home() {
  const URL = import.meta.env.VITE_URL;
  const [anime, setAnime] = useState<Array<object>>([]);
  const [loader, setLoader] = useState<boolean>(true);
  useEffect(() => {
    axios
      .get(`${URL}/popular`)
      .then((res) => {
        setAnime(res.data);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <h1 className="head">Popular Anime:</h1>
      {loader ? (
        <Loader />
      ) : (
        <div className="container">
          {anime.map((a: any) => (
            <Card key={a.id} anime={a} />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
