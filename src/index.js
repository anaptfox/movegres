import { start } from './exec.js';
import Conduit from './conduit.js';
import { getFileSize, makeDataDirectory, deleteDataDirectory, verifyPGConnection } from './utils.js';
import fs from 'fs';
import path from 'path';

export default async (dataPath, fileName, { pgTable, pgUrl }, pkgPath) => {
  const api = new Conduit();
  console.log('Starting...');
  console.log('House cleaning.. 🧽');

  await deleteDataDirectory(dataPath);
  await makeDataDirectory(dataPath);

  console.log('Starting Conduit');
  await start(dataPath);

  console.log('Checking to see if Conduit is running...');
  await api.getPipelines();
  console.log('It is running!');

  console.log('Creating Pipeline');
  const datetime = new Date().toISOString();
  const pipeline = await api.createPipeline(
    `movegres-${datetime}`,
    `A pipeline to move data from Postgres to a file. Created by movegres on ${datetime}`
  );

  const fileConfig = {
    type: 'TYPE_DESTINATION',
    plugin: `${pkgPath}/pkg/plugins/file/file`,
    pipelineId: pipeline.id,
    config: {
      name: 'file',
      settings: {
        path: path.resolve(dataPath, fileName),
      },
    },
  };

  const postgresConfig = {
    type: 'TYPE_SOURCE',
    plugin: `${pkgPath}/pkg/plugins/pg/pg`,
    pipelineId: pipeline.id,
    config: {
      name: 'pg',
      settings: {
        table: pgTable,
        url: pgUrl,
        cdc: 'false',
      },
    },
  };

  console.log('Checking your PG URL');
  await verifyPGConnection(pgUrl);
  console.log('Looks like we can connect to it.');

  console.log('Creating PG Connector');
  await api.createConnector(postgresConfig);

  console.log('Creating File Connector');
  await api.createConnector(fileConfig);

  console.log('Starting Pipeline');
  await api.startPipeline(pipeline.id);

  let lastChange = new Date();

  fs.watchFile(path.resolve(dataPath, fileName), (curr) => {
    lastChange = new Date();
    console.log(`Downloading ... ${curr.size} bytes`);
  });

  setInterval(async () => {
    if (lastChange < new Date() - 5000) {
      const fileSize = await getFileSize(dataPath, fileName);
      console.log(`Downloading ... ${fileSize} bytes`);
      console.log('Looks like we are done. Stopping Conduit');
      console.log(`Total File Size: ${fileSize} bytes`);
      process.exit(0);
    }
  }, 5000);
};
