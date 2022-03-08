import fs from 'fs';
import path from 'path';
import pg from 'pg';

export const getFileSize = async (dataPath, file) => {
  try {
    const stats = await fs.promises.stat(path.resolve(dataPath, file));
    return stats.size;
  } catch (error) {
    console.log(error);
  }
};

export const makeDataDirectory = async (dataPath) => {
  try {
    await fs.promises.mkdir(path.resolve(dataPath), { recursive: true });
  } catch (error) {
    console.log(error);
    throw Error('Could not create data directory');
  }
};

export const deleteDataDirectory = async (dataPath) => {
  try {
    await fs.promises.rm(path.resolve(dataPath), { recursive: true });
  } catch (error) {
    console.log(error);
  }
};

export const verifyPGConnection = async (pgUrl) => {
  const client = new pg.Client({
    connectionString: pgUrl,
  });
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
    throw Error('Could not connect to Postgres');
  }
};
