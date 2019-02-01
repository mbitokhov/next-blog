import fs from 'fs';

export function readFile(file: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, contents) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(contents);
    });
  });
}

export function writeFile(name: fs.PathLike | number, file: any, options: fs.WriteFileOptions = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, file, options, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
