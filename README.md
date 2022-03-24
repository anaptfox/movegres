# Movegres

A CLI tool that moves data from PostgreSQL to a file built on top of [Conduit](https://github.com/ConduitIO/conduit). 

This could be used for:
 - performing a data backup 
 - downloading data for analysis.
## Installation

To install with [npm](https://npmjs.org):

```
npm i -g movegres
```

## Usage

- **Required:** Before you can move data from PostgreSQL to a file, you'll need ... well ... a PostgreSQL database and a file.
- **Required:** [Add Conduit do your Path](https://docs.conduit.io/guides/how-to-add-conduit-to-your-path)



```bash
movegres 
  --fileName=file.json \  # output filename
  --dataPath=/my/downloads \ # output folder
  --pgUrl=postgres://user:password@host:port/db \ # postgres URL
  --pgTable=table \ # postgres table
  --pkgPath=path/to/conduit/pkg \ # path to conduit plugins
```

## How it works

To learn more about how this tool works check out:

- [Writing Data Integration Software with the Conduit REST API](https://medium.com/meroxa/writing-data-integration-software-with-the-conduit-rest-api-a17c563e854)
- [Conduit](https://conduit.io)
