import axios from "../../axios";
import React, { useEffect, useState } from "react";
import requests from "../../request";
import "./Banner.css"

function Banner() {
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchMovieData() {
      const response = await axios.get(requests.fetchNetflixOriginals);
      const id = Math.floor(Math.random() * response.data.results.length - 1);
      setMovie(response.data.results[id]);
    }
    fetchMovieData();
  }, []);
  function truncate(str,n) {
      return str?.length > n ? str.substr(0, n-1) + "..." :  str;
  }
  return (
    <header className="banner"
        style={{
            backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition:"center center",
            backgroundSize:"cover"
        }}>
      <div className="banner_content">
        {/* Title */}
        <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* Div > 2 buttons */}
        <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">MyList</button>
        </div>
        {/* Description */}
        <p className="banner_description">
            {truncate(movie?.overview, 150)}
        </p>
      </div>
      <div className="fade_bottom"/>
    </header>
  );
}

export default Banner;
