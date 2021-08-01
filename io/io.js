const fsPromises = require('fs/promises');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');


function listFiles(rootPath) {
  return fsPromises
    .readdir(rootPath, { withFileTypes: true })
    .then((dirents) =>
      dirents.reduce(
        (acc, dirent) => {
          acc[dirent.isDirectory() ? "dirs" : "files"].push(dirent.name);
          return acc;
        },
        { files: [], dirs: [] }
      )
    )
    .then((data) =>
      Promise.all(
        data.dirs.map((folder) => listFiles(path.join(rootPath, folder)))
      ).then((fileArrays) =>
        data.files.concat(fileArrays.flatMap((array) => array))
      )
    );
}

//listFiles(path.resolve()).then(console.log);

async function* listFilesGen(rootPath) {
    const dirents = await fsPromises.readdir(rootPath, { withFileTypes: true });

    for(const dirent of dirents) {
        if (!dirent.isDirectory()) {
            yield dirent.name;
        } else {
            yield* listFilesGen(path.join(rootPath, dirent.name))
        }
    }
} 

const gen = listFilesGen(path.resolve());

// new Array(100)
//     .fill(0)
//     .map(() => gen.next().then(console.log))
    

	
//  fs.readFile(path.resolve('README.md'), 'utf8')
//     .then((data) => {
//         console.log(data)
//     })


const read = fs.createReadStream(path.resolve('Screenshot_20210705_081353.png'));
const write = fs.createWriteStream('Screenshot_20210705_081353.png.gz');
const gz = zlib.createGzip();

read.pipe(gz).pipe(write);