import 'dotenv/config';
import { start, stop } from './startConduit.js';
import { getPipelines, createConnector, createPipeline, startPipeline } from './conduit.js';
import { getFileSize, makeDataDirectory, deleteDataDirectory } from './utils.js';
import fs from 'fs';

const main = async () => {
  console.log('Starting...');
  console.log('Resetting the world.');

  await deleteDataDirectory();
  await makeDataDirectory();

  console.log('Starting Conduit');
  await start();

  console.log('Getting Pipelines');
  const pipelines = await getPipelines();

  console.log('Pipelines:', pipelines);

  console.log('Creating Pipeline');
  const datetime = new Date().toISOString();
  const pipeline = await createPipeline(
    `movegres-${datetime}`,
    `A pipeline to move data from Postgres to a file. Created by movegres on ${datetime}`
  );

  const fileConfig = {
    type: 'TYPE_DESTINATION',
    plugin: `${process.env.CONDUIT_PKG_PATH}/pkg/plugins/file/file`,
    pipelineId: pipeline.id,
    config: {
      name: 'file',
      settings: {
        path: process.env.FILE,
      },
    },
  };

  const postgresConfig = {
    type: 'TYPE_SOURCE',
    plugin: `${process.env.CONDUIT_PKG_PATH}/pkg/plugins/pg/pg`,
    pipelineId: pipeline.id,
    config: {
      name: 'pg',
      settings: {
        table: process.env.POSTGRES_TABLE,
        url: process.env.POSTGRES_URL,
        cdc: 'false',
      },
    },
  };

  console.log('Creating PG Connector');
  await createConnector(postgresConfig);

  console.log('Creating File Connector');
  await createConnector(fileConfig);

  console.log('Starting Pipeline');
  await startPipeline(pipeline.id);

  let lastChange = new Date();

  fs.watchFile(process.env.FILE, (curr) => {
    lastChange = new Date();
    console.log(`Downloading ... ${curr.size} bytes`);
  });

  setInterval(async () => {
    if (lastChange < new Date() - 5000) {
      const fileSize = await getFileSize();
      console.log('Looks like we are done. Stopping Conduit');
      console.log(`Current file size: ${fileSize} bytes`);
      process.exit(0);
    }
  }, 5000);
};

main();

process.on('SIGINT', async () => {
  console.log('Stopping Conduit');
  await deleteDataDirectory();
  stop();
  console.log('Stopped Conduit');
  process.exit();
});
