#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import movegres from '../src/index.js';
import { deleteDataDirectory } from '../src/utils.js';
import { stop } from '../src/exec.js';

const { argv } = yargs(hideBin(process.argv));
const { fileName, dataPath, pgUrl, pgTable, pkgPath } = argv;

if (!fileName || !dataPath || !pgUrl || !pgTable || !pkgPath) {
  console.log('Missing required arguments');
  process.exit(1);
}

movegres(
  dataPath,
  fileName,
  {
    pgTable,
    pgUrl,
  },
  pkgPath
);

process.on('SIGINT', async () => {
  console.log('Stopping Conduit');
  await deleteDataDirectory(dataPath);
  stop();
  console.log('All done. Have a beautiful day ☀️.');
  process.exit();
});

