import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(() => {
    if (query.trim() === '') return;

    axios({
      method: 'get',
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${currentPage}`,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer YOUR_API_KEY', // Replace with your actual token
      },
    })
    .then((response) => {
      setSearchedMovieList(response.data.results);
      setTotalPages(response.data.total_pages);
      console.log(response.data.results);
    })
    .catch((error) => console.log(error));
  }, [query, currentPage]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleSave = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!selectedMovie) {
      alert('Please search and select a movie.');
      return;
    }

    const data = {
      tmdbId: selectedMovie.id,
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      popularity: selectedMovie.popularity,
      releaseDate: selectedMovie.release_date,
      voteAverage: selectedMovie.vote_average,
      backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
      posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
      isFeatured: 0,
    };

    const requestMethod = movieId ? 'patch' : 'post';
    const requestUrl = movieId ? `/movies/${movieId}` : '/movies';

    axios({
      method: requestMethod,
      url: requestUrl,
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response);
      alert('Success');
      navigate('/main/movies'); // Redirect after saving
    })
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (movieId) {
      axios.get(`/movies/${movieId}`).then((response) => {
        setMovie(response.data);
        const tempData = {
          id: response.data.tmdbId,
          original_title: response.data.title,
          overview: response.data.overview,
          popularity: response.data.popularity,
          poster_path: response.data.posterPath,
          release_date: response.data.releaseDate,
          vote_average: response.data.voteAverage,
        };
        setSelectedMovie(tempData);
      });
    }
  }, [movieId]);

  useEffect(() => {
    handleSearch();
  }, [currentPage, handleSearch]); // Re-fetch when currentPage or query changes

  return (
    <>
      <h1>{movieId ? 'Edit ' : 'Create '} Movie</h1>

      {!movieId && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => {
                setQuery(event.target.value);
                setCurrentPage(1); // Reset to the first page on new search
              }}
            />
            <button type='button' onClick={() => { setCurrentPage(1); handleSearch(); }}>
              Search
            </button>
            <div className='searched-movie'>
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            <div className='pagination'>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span> Page {currentPage} of {totalPages} </span>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form>
          {selectedMovie && (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.original_title : ''}
              onChange={(e) => {
                if (selectedMovie) {
                  setSelectedMovie({ ...selectedMovie, original_title: e.target.value });
                }
              }}
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              value={selectedMovie ? selectedMovie.overview : ''}
              onChange={(e) => {
                if (selectedMovie) {
                  setSelectedMovie({ ...selectedMovie, overview: e.target.value });
                }
              }}
            />
          </div>
          <div className='field'>
            Popularity:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.popularity : ''}
              onChange={(e) => {
                if (selectedMovie) {
                  setSelectedMovie({ ...selectedMovie, popularity: e.target.value });
                }
              }}
            />
          </div>
          <div className='field'>
            Release Date:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.release_date : ''}
              onChange={(e) => {
                if (selectedMovie) {
                  setSelectedMovie({ ...selectedMovie, release_date: e.target.value });
                }
              }}
            />
          </div>
          <div className='field'>
            Vote Average:
            <input
              type='text'
              value={selectedMovie ? selectedMovie.vote_average : ''}
              onChange={(e) => {
                if (selectedMovie) {
                  setSelectedMovie({ ...selectedMovie, vote_average: e.target.value });
                }
              }}
            />
          </div>

          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
