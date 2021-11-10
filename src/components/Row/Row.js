import React, { useState, useEffect } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube"; 
import movieTrailer from 'movie-trailer';

const imgUrl = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // snippet of code which runs based on a specific condition/ variable
  // when row component loads, i want to run this code
  useEffect(() => {
    // if [], run once when row loads, and don't run again
    async function fetchData() {
      const res = await axios.get(fetchUrl);
      setMovies(res.data.results);
      return res;
    }
    fetchData();
  }, [fetchUrl]);

  const options = {
    height: "390",
    width:"100%",
    playerwars: {
      autoplay: 1
    },
  };

  const handleClick = (movie) => {
    if(trailerUrl) {
      setTrailerUrl("")
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.source || "")
      .then((url) => {
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get("v"))
      })
      .catch((error) => console.log(error));
    }
  }
  return (
    <div className="row">
      <h2>{title}</h2>
      {/* container posters */}
      <div className="row_posters">
        {/* row poster */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${imgUrl}${
              isLargeRow ? movie.poster_path : movie?.backdrop_path || movie?.poster_path
            }`}
            alt={movie.title}
          />
        ))}
      </div>
      { trailerUrl && <YouTube videoId={trailerUrl} opts={options}/>}
    </div>
  );
}

export default Row;
