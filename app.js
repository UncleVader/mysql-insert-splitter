const fs = require('fs');
const readline = require('readline');
const path = require('path');

function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
  return formattedTime;
}

function listAndSplitTextFiles(folderPath) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading folder: ${err}`);
      return;
    }

    const textFiles = files.filter(file => path.extname(file).toLowerCase() === '.sql');

    textFiles.forEach(file => {
      const inputFilePath = path.join(folderPath, file);
      const outputFilePath = path.join(folderPath, `output_${file}`);

      const startTime = new Date();

      console.log(`Processing file: ${file}...`);
      splitTextFile(inputFilePath, outputFilePath, () => {
        const endTime = new Date();
        const elapsedTime = endTime - startTime;
        console.log(`Processed file: ${file}. Elapsed time: ${formatTime(elapsedTime)}`);
      });

    });
  });
}


function splitTextFile(inputFilePath, outputFilePath, cb) {
  const inputStream = fs.createReadStream(inputFilePath);
  const outputStream = fs.createWriteStream(outputFilePath);

  const lineReader = readline.createInterface({
    input: inputStream,
    output: outputStream,
    terminal: false
  });

  const insertMask = new RegExp('^INSERT INTO (.+) VALUES$')
  let replacing = false
  let replacingPattern

  lineReader.on('line', (line) => {
    if (replacing) {
      if (line.match(/;$/)) {
        replacing = false
        line = replacingPattern + line + '\n'
      } else {
        line = line.replace(/,$/,'')
        if (!line) {
          return
        }
        line = replacingPattern + line + ';\n'
      }
    } else {
      const test = line.match(insertMask)
      if (test) {
        replacing = true
        replacingPattern = test[0] + ' '
        return
      } else {
        line += '\n'
      }
    }

    outputStream.write(line);

  });

  lineReader.on('close', () => {
    outputStream.end();
    if (cb) {
      cb()
    }
  });
}

listAndSplitTextFiles('./');
