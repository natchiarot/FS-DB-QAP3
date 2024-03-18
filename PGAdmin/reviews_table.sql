CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	movie_id SERIAL,
	rating DECIMAL(3, 1) NOT NULL,
	CONSTRAINT check_rating CHECK (rating BETWEEN 1 AND 5),
	review_text VARCHAR(1000),
	FOREIGN KEY (movie_id) REFERENCES movies(movie_id)
);