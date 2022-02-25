import { execa } from 'execa';

let _localProcess;

export function start() {
  return new Promise((resolve, reject) => {
    try {
      const subprocess = execa('conduit', ['--db.badger.path', './data/conduit.db']);

      _localProcess = subprocess;
      // Subprocess.stdout.pipe(process.stdout);
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
