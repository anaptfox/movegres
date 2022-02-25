# Movegres

Move data from PostgreSQL to file with one command. 

## Getting Started

1. Copy env file:

```
cp .env.example .env
```

2. Fill out `.env`:

- CONDUIT_DATA_PATH - Where do you want conduit data stored? ex. `/Users/src/anaptfox/movegres/data`  
- CONDUIT_PKG_PATH - Path to conduit pkgs ex. `/Users/anaptfox/bin`  
-  POSTGRES_URL - PG URL ex. `postgres://meroxauser:meroxapass@localhost:5432/meroxadb?sslmode=disable`
- POSTGRES_TABLE= PG Table ex. `users`
- FILE - Destination file ex. `/Users/anaptfox/src/anaptfox/movegres/data/pg.json`

3. Run:

```
yarn start
```

Example outoput:

```
$ node src/index.js
Starting...
Resetting the world.
Starting Conduit
Getting Pipelines
Pipelines: []
Creating Pipeline
Creating PG Connector
Creating File Connector
Starting Pipeline
Downloading ... 0 bytes
Looks like we are done. Stopping Conduit
Current file size: 410 bytes
```