
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            }
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(rootDir);
let fixedCount = 0;

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        // Regex to match conflict blocks and capture the HEAD content
        // Note: This assumes standard git conflict markers
        // match: <<<<<<< HEAD\n(content)\n=======\n(content)\n>>>>>>> hash
        const conflictRegex = /<<<<<<< HEAD[\r\n]+([\s\S]*?)=======[\r\n]+[\s\S]*?>>>>>>> [a-f0-9]+/g;

        if (conflictRegex.test(content)) {
            console.log(`Fixing conflicts in: ${file}`);
            const newContent = content.replace(conflictRegex, (match, p1) => {
                return p1;
            });
            fs.writeFileSync(file, newContent, 'utf8');
            fixedCount++;
        }
    } catch (err) {
        // ignore binary files or read errors
    }
});

console.log(`Fixed conflicts in ${fixedCount} files.`);
