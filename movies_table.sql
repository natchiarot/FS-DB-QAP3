CREATE TABLE movies (
	movie_id SERIAL PRIMARY KEY,
	genre_id SERIAL,
	title VARCHAR (255) NOT NULL,
	release_date DATE NOT NULL,
	director VARCHAR (255) NOT NULL,
	description VARCHAR (1000),
	poster_url VARCHAR(1024),
	FOREIGN KEY (genre_id) REFERENCES genres(genre_id)
);