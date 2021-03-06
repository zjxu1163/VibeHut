const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

let mysql = require('mysql');

let connection = mysql.createConnection({
    host: "34.121.26.227",
    user: "root",
    database: "vibehut",
    password: "cs348vibehut"
  });

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// test connection to database

connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the VibeHut server.');
  });


//app.get("/test", (req, res) => res.send("testing backend"));

// query to create a user account
app.post('/createAccount',(req, res) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var userId = req.body.userId;
    console.log(req.body);
    var querystring = "INSERT INTO users (userId, username, email, password, isAdmin) VALUES (" + userId + ", '" + username + "', '" + email + "', '" + password + "', 0)";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added user");
});


// query to return all users
app.get("/getUsers", (req, res) => {
    let userquery = `SELECT * FROM users`;
    connection.query(userquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to see if exact user exists in database
app.get("/checkUserExists", (req, res) => {
    var username = req.query.username;
    var querystring = "SELECT * FROM users WHERE username='" + username + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

app.get('/CheckPassword', (req, res) => {
    var id = req.query.id;
    var querystring = "SELECT password FROM users WHERE userId='" + id + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

app.post('/UpdatePassword', (req, res) => {
    var id = req.body.id;
    var password = req.body.password;
    var querystring = "UPDATE users SET password ='" + password + "'WHERE userId='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("password updated");
});

app.post('/UpdateUsername', (req, res) => {
    var id = req.body.id;
    var username = req.body.username;
    var querystring = "UPDATE users SET username ='" + username + "'WHERE userId='" + id + "'";
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("username updated");
});

// query to log user in database
app.get("/login", (req, res) => {
    var username = req.query.username;
    var password = req.query.password;
    var querystring = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
    console.log(querystring);
    let usermatchquery = querystring;
    connection.query(usermatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// test query to return all songs
app.get("/getSongs", (req, res) => {
    let songquery = `SELECT * FROM songs`;
    connection.query(songquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return all moods
app.get("/getMoods", (req, res) => {
    let moodquery = `SELECT * FROM moods`;
    connection.query(moodquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to see if exact song exists in database
app.get("/checkSongExists", (req, res) => {
    var songtitle = req.query.songtitle;
    var artist = req.query.artist;
    var querystring = "SELECT * FROM songs WHERE song_title='" + songtitle + "' AND artist='" + artist + "'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific song
app.get("/getMatchingSongs", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM songs WHERE song_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific book
app.get("/getMatchingBooks", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM books WHERE book_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to search for a specific movie
app.get("/getMatchingMovies", (req, res) => {
    var toMatch = req.query.toMatch;
    var querystring = "SELECT * FROM movies WHERE movie_title LIKE '%" + toMatch + "%'";
    console.log(querystring);
    let songmatchquery = querystring;
    connection.query(songmatchquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to get songs for a playlist for a searched movie
app.get("/getPlaylistForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT s.song_id, s.song_title, s.artist FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN songmoods sm ON sm.mood_id=mm.mood_id JOIN songs s ON sm.song_id=s.song_id WHERE m.movie_id=" + movieId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get songs for a playlist for a searched book
app.get("/getPlaylistForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT s.song_id, s.song_title, s.artist FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN songmoods sm ON sm.mood_id=bm.mood_id JOIN songs s ON sm.song_id=s.song_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for book
app.get("/getRecommendedBooksForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT b2.book_title, b2.author FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN bookmoods bm2 ON bm2.mood_id=bm.mood_id JOIN books b2 ON b2.book_id=bm2.book_id WHERE b.book_id=" + bookId + " AND b2.book_id!=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for book
app.get("/getRecommendedMoviesForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT m.movie_title, m.year_released FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN moviemoods mm ON mm.mood_id=bm.mood_id JOIN movies m ON mm.movie_id=m.movie_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for movie
app.get("/getRecommendedBooksForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT b.book_title, b.author FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN bookmoods bm ON bm.mood_id=mm.mood_id JOIN books b ON b.book_id=bm.book_id WHERE m.movie_id=" + movieId;    
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for movie
app.get("/getRecommendedMoviesForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT m2.movie_title, m2.year_released FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN moviemoods mm2 ON mm2.mood_id=mm.mood_id JOIN movies m2 ON m2.movie_id=mm2.movie_id WHERE m.movie_id=" + movieId + " AND m2.movie_id!=" + movieId;
       let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});


// query to add a song
app.post('/addSong',(req, res) => {
    var song_title = req.body.songtitle;
    var artist = req.body.artist;
    var album_name = req.body.albumname;
    var song_id = req.body.songid;
    console.log(req.body);
    var querystring = "INSERT INTO songs (song_id, song_title, artist, album_name) VALUES (" + song_id + ", '" + song_title + "', '" + artist + "', '" + album_name + "')";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added song");
});

// query to add song moods
app.post('/addSongMoods', (req, res) => {
    var song_id = req.body.songid;
    var mood_id_list = req.body.moodidlist;

    console.log(song_id);
    console.log(mood_id_list);

    for (let i = 0; i < mood_id_list.length; i++) {
        console.log(mood_id_list[i]);
        var querystring = "INSERT INTO songmoods (song_id, mood_id) VALUES (" + song_id + ", " + mood_id_list[i] + ")";
        connection.query(  querystring, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
        });
    }
    res.end("added song moods");
})

// query to get mood id from mood name
app.get('/getMoodIds', (req, res) => {
    var mood_names = req.query.moodnames;

    console.log(mood_names);
    var querystring = "SELECT mood_id FROM moods WHERE mood_name='" + mood_names[0] + "'";
    for (let i = 1; i < mood_names.length; i++) {
        querystring += " OR mood_name='" + mood_names[i] + "'";
    }
    console.log(querystring);
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
})

// query to get recommended books for book
app.get("/getRecommendedBooksForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT b2.book_title, b2.author FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN bookmoods bm2 ON bm2.mood_id=bm.mood_id JOIN books b2 ON b2.book_id=bm2.book_id WHERE b.book_id=" + bookId + " AND b2.book_id!=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for book
app.get("/getRecommendedMoviesForBook", (req, res) => {
    var bookId = req.query.bookId;
    var querystring = "SELECT DISTINCT m.movie_title, m.year_released FROM books b JOIN bookmoods bm ON b.book_id=bm.book_id JOIN moviemoods mm ON mm.mood_id=bm.mood_id JOIN movies m ON mm.movie_id=m.movie_id WHERE b.book_id=" + bookId;
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended books for movie
app.get("/getRecommendedBooksForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT b.book_title, b.author FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN bookmoods bm ON bm.mood_id=mm.mood_id JOIN books b ON b.book_id=bm.book_id WHERE m.movie_id=" + movieId;    
    let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to get recommended movies for movie
app.get("/getRecommendedMoviesForMovie", (req, res) => {
    var movieId = req.query.movieId;
    var querystring = "SELECT DISTINCT m2.movie_title, m2.year_released FROM movies m JOIN moviemoods mm ON m.movie_id=mm.movie_id JOIN moviemoods mm2 ON mm2.mood_id=mm.mood_id JOIN movies m2 ON m2.movie_id=mm2.movie_id WHERE m.movie_id=" + movieId + " AND m2.movie_id!=" + movieId;
       let playlistquery = querystring;
    connection.query(playlistquery, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to return all playlists
app.get("/getPlaylists", (req, res) => {
    let query = `SELECT * FROM playlists`;
    connection.query(query, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
    });
});

// query to add a playlist
app.post('/addPlaylist',(req, res) => {
    var playlist_name = req.body.playlist_name;
    var playlist_id = req.body.playlist_id;
    var user_id = req.body.user_id;
    console.log(req.body);
    var querystring = "INSERT INTO playlists (playlist_id, playlist_name, user_id) VALUES (" + playlist_id + ", '" + playlist_name + "', '" + user_id + "')";
    connection.query(  querystring, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
    });
    res.end("added playlist");
});

// query to add song to playist
app.post('/addPlaylistSongs', (req, res) => {
    var playlist_id = req.body.playlist_id;
    var song_id_list = req.body.songIdList;

    console.log(playlist_id);
    console.log(song_id_list);

    for (let i = 0; i < song_id_list.length; i++) {
        console.log(song_id_list[i]);
        var querystring = "INSERT INTO playlistsongs (playlist_id, song_id) VALUES (" + playlist_id + ", " + song_id_list[i] + ")";
        connection.query(  querystring, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log(results);
        });
    }
    res.end("added playlist songs");
})

app.listen(port, () => console.log(`app listening on port ${port}`));