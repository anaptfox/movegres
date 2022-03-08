import { execa } from 'execa';
import path from 'path';

let _localProcess;

export function start(dataPath) {
  return new Promise((resolve, reject) => {
    try {
      const subprocess = execa('conduit', ['--db.badger.path', path.resolve(dataPath, 'conduit.db')]);

      //   Subprocess.stdout.pipe(process.stdout);
      subprocess.stderr.pipe(process.stderr);

      _localProcess = subprocess;
      setTimeout(() => {
        resolve();
      }, 2000);
    } catch (error) {
      reject(error);
    }
  });
}

export function stop() {
  if (_localProcess) {
    _localProcess.kill('SIGTERM', {
      forceKillAfterTimeout: 2000,
    });
  }
}
