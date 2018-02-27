import { cleanDir } from './fs';

/**
 * Cleans up the output (build) directory.
 */
function clean() {
  return Promise.all([
    cleanDir('build/*', {
      nosort: true,
      dot: true,
    }),
  ]);
}

export default clean;
