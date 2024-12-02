import * as fs from 'fs'
import 'dotenv/config'
import { writeFile, mkdir, existsSync } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);
const dirPath = join('src', 'environment');

function generateEnvironmentContent() {
  
  return `export const environment = {
  production: ${process.env.PRODUCTION},
  apiUrl: "${process.env.API_URL}",
  featureFlag:${process.env.FEATURE_FLAG},
  clientId:"${process.env.CLIENT_ID}",
  clientSecret:"${process.env.CLIENT_SECRET}",
  whisperApiKey:"${process.env.WHISPER_API_KEY}",
  stripe: {
    publicKey:"${process.env.PUBLIC_KEY}",
    plan1:"${process.env.PLAN1}",
    plan2:"${process.env.PLAN2}"
  }
};`
  }   
  (async function generateEnvironment() {     
  const fileName = 'environment.prod.ts'; 
  const content = generateEnvironmentContent();
  console.log(content)

  if (!existsSync(dirPath)) {
    await mkdirAsync(dirPath, { recursive: true });
    console.log(`Directory ${dirPath} created.`);
  }

  try {
    await writeFileAsync(join(dirPath, fileName), content);
    console.log('Environment file is generated!');
  } catch (err) {
    console.error(err);
  }
  })(); 