import { readFile as baseReadFile } from 'fs';

export function readFile(file: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    baseReadFile(file, (err, contents) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(contents);
    });
  });
}
