import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const file of ['index.html','style.css','game.js','engine.js'])await copyFile(file,`dist/${file}`);
console.log('Production build ready in dist/ (static hosting, no dependencies).');
