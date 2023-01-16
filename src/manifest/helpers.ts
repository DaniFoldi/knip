import path from 'node:path';
import { require } from '../util/require.js';

export const getPackageManifest = async (workingDir: string, packageName: string, isRoot: boolean, cwd: string) => {
  // TODO Not sure what's the most efficient way to get a package.json, but this seems to do the job across package
  // managers (npm, Yarn, pnpm)
  try {
    return require(path.join(workingDir, 'node_modules', packageName, 'package.json'));
  } catch (error) {
    if (!isRoot) {
      try {
        return require(path.join(cwd, 'node_modules', packageName, 'package.json'));
      } catch (error) {
        // Explicitly suppressing errors here
      }
    }
    // Explicitly suppressing errors here
  }
};