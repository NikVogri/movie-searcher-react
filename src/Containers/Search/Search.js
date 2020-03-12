import React, { useState, useEffect } from "react";
import classes from "./Search.module.css";
import Item from "../../Components/Item/Item";
import axios from "axios";
import Pagination from "../../Components/Pagination/Pagination";

const Search = () => {
  const [results, setResults] = useState([]);
  const [selectValue, setselectValue] = useState("movie");
  const [inputValue, setinputValue] = useState("");
  const [firstMount, setfirstMount] = useState(true);

  const [noResults, setnoResults] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!firstMount && inputValue !== "") {
      const inputChangeHandler = () => {
        axios
          .get(
            `https://api.themoviedb.org/3/search/${selectValue}?api_key=dce6a338a810ffe30be7528d9a32bf13&query=${inputValue}&page=${currentPage}&include_adult=false`
          )
          .then(res => {
            setResults(res.data.results);
            setTotalpages(res.data.total_pages);
            setnoResults(false);
            if (res.data.total_results === 0) {
              setnoResults(true);
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
      inputChangeHandler();
    }
    setfirstMount(false);
  }, [inputValue, selectValue, currentPage, firstMount]);

  const getPageHandler = id => {
    setCurrentPage(id);
  };

  let render = null;
  let pages = [];
  // check if state has any results
  if (results) {
    render = results.map(el => {
      // check if the movie has been recently updated and or has any traction at all. This is mostly for fetching sake.
      return (
        <Item
          type={selectValue}
          key={el.id}
          id={el.id}
          title={el.title ? el.title : el.name}
          image={el.poster_path}
          voteAverage={el.vote_average}
          votes={el.vote_count}
          popularity={el.popularity}
          description={el.overview}
          releaseDate={el.release_date || el.first_air_date}
        />
      );
    });
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    }
    pages = pages.slice(0, 5);
  }
  let pagesRender = null;
  if (pages.length > 1) {
    pagesRender = pages.map(el => (
      <Pagination
        key={el}
        pageNumber={el}
        clickHandler={() => getPageHandler(el)}
        page={currentPage}
      />
    ));
  }

  if (noResults) {
    render = (
      <h3 style={{ fontSize: "22px", color: "#fff" }}>No results found!</h3>
    );
  }

  return (
    <div className={classes.Search}>
      <form onSubmit={e => e.preventDefault()}>
        <select onChange={e => setselectValue(e.target.value)}>
          <option value="movie">Movies</option>
          <option value="tv">TV</option>
        </select>
        <input
          className={classes.Input}
          onChange={e => {
            setinputValue(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search now!"
        />
      </form>
      <div className={classes.MovieList}>{render}</div>
      <div className={classes.Pagination}>{pagesRender}</div>
    </div>
  );
};

export default Search;
