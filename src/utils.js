import fs from 'fs';
import 'dotenv/config';

export const getFileSize = async () => {
  try {
    const stats = await fs.promises.stat(process.env.FILE);
    return stats.size;
  } catch (error) {
    console.log(error);
  }
};

export const makeDataDirectory = async () => {
  try {
    await fs.promises.mkdir(process.env.CONDUIT_DATA_PATH, { recursive: true });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDataDirectory = async () => {
  try {
    await fs.promises.rm(process.env.CONDUIT_DATA_PATH, { recursive: true });
  } catch (error) {
    console.log(error);
  }
};
