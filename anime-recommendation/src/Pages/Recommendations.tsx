import { useState } from "react";
import suggestions from "../Assets/columns.json";
import Card from "./Components/Card";
import axios from "axios";

interface Anime {
  id: string;
  title: string;
  image_url: string;
  numberEp: string;
  epAvg: string;
}

function Recommendations() {
  const [suggest, setSuggest] = useState<string>("");
  const [anime, setAnime] = useState<string>("");
  const [animeList, setAnimeList] = useState<Anime[]>([]);

  function sug(value: string) {
    let result = "";
    if (value === "") {
      setSuggest("");
      return;
    }
    value = value.trim();
    for (let i = 0; i < suggestions.length; i++) {
      if (suggestions[i].toLowerCase().includes(value.toLowerCase())) {
        result += suggestions[i] + ",";
      }
    }
    setSuggest(result);
  }

  function fetchAnimes() {
    const URL = import.meta.env.VITE_URL;
    axios.get(URL + "/recommend?anime=" + anime).then((res) => {
      setAnimeList(res.data);
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnimes();
    setAnime("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAnime(value);
    sug(value);
  };

  return (
    <>
      <div className="recommendations">
        <h1>Enter an amine for recommendation</h1>
        <form className="search" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            required
            value={anime}
            placeholder="Enter anime"
          />
          <button type="submit">Submit</button>
          <div className={`suggestions ${suggest ? "active" : ""}`}>
            {suggest
              .split(",")
              .slice(0, 5)
              .map((e, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setAnime(e);
                    setSuggest("");
                  }}
                >
                  {e}
                </div>
              ))}
          </div>
        </form>
      </div>
      <hr />
      {animeList[0] ? (
        <div className="container">
          {animeList.map((e) => (
            <Card key={e.id} anime={e} />
          ))}
        </div>
      ) : null}
    </>
  );
}

export default Recommendations;
