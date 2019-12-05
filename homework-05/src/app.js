const path = require('path');
const fsp = require('fs').promises;
const zlib = require('zlib');
const { promisify } = require('util');

const gunzip = promisify(zlib.gunzip);
const gzip = promisify(zlib.gzip);

const inputDirName = 'input';
const outputDirName = 'output';
const outputFileName = 'result.json.gz';

// const inputDir // absolute path to input dir
const inputDir = path.resolve(inputDirName);
// const outputFile // absolute path to output file
const outputFile = path.resolve(outputDirName, outputFileName);

async function getInputFileList() {
  try {
    const file = await fsp.readdir(inputDirName);
    return file.map((newFile) => path.join(inputDir, newFile));
  } catch (error) {
    console.error('File reading problem,', error);
  }
  return null;
}

async function getObjectFromFile(filePath) {
  try {
    const buffer = await fsp.readFile(filePath);
    const bufferJson = await gunzip(buffer);
    return JSON.parse(await bufferJson.toString());
  } catch (error) {
    console.error('Error convert to buffer', error);
  }
  return null;
}

function rebuildUrl(originalUrl) {
  if (!originalUrl) throw new Error('Error URL');
  const url = new URL(originalUrl);
  url.protocol = 'https';
  const pathnameParse = path.parse(url.pathname);
  const pathnameParseDir = path.parse(pathnameParse.dir);
  const newURL = path.join(
    url.origin,
    pathnameParseDir.base,
    '?file=',
    pathnameParse.name,
    '$type=',
    pathnameParse.ext,
  );
  return newURL;
}

async function buildOutputObject(files) {
  const result = {};
  try {
    // eslint-disable-next-line no-restricted-syntax
    for (const res of files) {
      // eslint-disable-next-line no-await-in-loop
      const object = await getObjectFromFile(res);
      object.url = rebuildUrl(object.url);
      // eslint-disable-next-line no-await-in-loop
      const name = await path.basename(res.toLocaleLowerCase(), '.json.gz');
      result[name] = object;
    }
    return result;
  } catch (error) {
    console.error('Error object from file ', error);
  }
  return null;
}

async function saveOutput(object) {
  try {
    const buffer = Buffer.from(JSON.stringify(object));
    const bufferCompress = await gzip(buffer);
    await fsp.writeFile(outputFile, bufferCompress);
    return 'file saved';
  } catch (error) {
    console.error('Error saved file', error);
  }
  return null;
}
async function start() {
  try {
    const inputFiles = await getInputFileList();
    const outputObject = await buildOutputObject(inputFiles);
    const savedFile = await saveOutput(outputObject);
    return savedFile;
  } catch (error) {
    console.error('Error run function', error);
  }
  return null;
}

start()
  .then((res) => console.log(res))
  .catch((err) => console.error('🐞  🤪  🐛\n', err));
