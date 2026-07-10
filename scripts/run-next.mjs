import { spawn } from 'node:child_process';
import { access, rename } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const tsConfigPath = path.join(root, 'next.config.ts');
const hiddenTsConfigPath = path.join(root, '.next.config.ts.hold');
const nextBinPath = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const args = process.argv.slice(2);

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function run() {
  const shouldHideTsConfig = await exists(tsConfigPath);

  if (shouldHideTsConfig) {
    if (await exists(hiddenTsConfigPath)) {
      await rename(hiddenTsConfigPath, tsConfigPath);
    }
    await rename(tsConfigPath, hiddenTsConfigPath);
  }

  try {
    const exitCode = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, [nextBinPath, ...args], {
        cwd: root,
        stdio: 'inherit',
        env: process.env,
      });

      child.on('error', reject);
      child.on('exit', (code, signal) => {
        if (signal) {
          reject(new Error(`next exited with signal ${signal}`));
          return;
        }
        resolve(code ?? 0);
      });
    });

    process.exitCode = exitCode;
  } finally {
    if (shouldHideTsConfig && (await exists(hiddenTsConfigPath))) {
      await rename(hiddenTsConfigPath, tsConfigPath);
    }
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
