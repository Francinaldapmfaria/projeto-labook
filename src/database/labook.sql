-- Active: 1675442048351@@127.0.0.1@3306


CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

DROP TABLE users;


SELECT * FROM users;

INSERT INTO users(id, name, email, password, role)
VALUES
("a001","Lua", "luazinha@email.com", "155445", "adm"),
("a002", "Linda", "lindinha@email.com", "454544", "usuário");

CREATE TABLE posts(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE --PARA QDO USUARIO DELETADO, TODOS AS PLAYLISTS DO USUARIO SERÁ DELETADO
        ON UPDATE CASCADE --PARA QDO USUARIO EDITADO, TODOS AS PLAYLISTS DO USUARIO SERÁ EDITADO
);
DROP TABLE posts;

INSERT INTO posts (id, creator_id, content)
VALUES
("p001", "a001","Meu primeiro dia de trabalho"),
("p002", "a002", "Viagem para Maldivas");

SELECT*FROM posts;

SELECT  
    posts.id ,
    posts.creator_id ,
    posts.content ,
    posts.likes,
    posts.dislikes,
    posts.created_at,
    posts.updated_at,
    users.name As creator_name

FROM posts
JOIN users
ON posts.creator_id = users.id;

UPDATE posts 
SET likes = 1
WHERE id = "p002";


CREATE TABLE likes_dislikes(
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO likes_dislikes(user_id, post_id, like )
VALUES --like 1 e dislike 0
("a002", "p001",0), --a002 deu dislike no post p001
("a001", "p002", 1); --a001 deu like no post p002

SELECT * FROM likes_dislikes;