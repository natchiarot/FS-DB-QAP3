SELECT 
    movies.movie_id, 
    movies.title, 
    movies.release_date,
    movies.director, 
    movies.description, 
    genres.genre_name,
    reviews.review_id,
    reviews.rating,
    reviews.review_text
  FROM movies 
  INNER JOIN 
    genres ON movies.genre_id=genres.genre_id 
  LEFT JOIN 
    reviews ON movies.movie_id = reviews.movie_id
  WHERE movies.movie_id = 87