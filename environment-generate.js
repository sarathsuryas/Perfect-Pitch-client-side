import * as fs from 'fs'
import 'dotenv/config'

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
  (function generateEnvironment() {     
  const fileName = 'environment.prod.ts'; // you can this as hard coded name, or you can use your own unique name
  const content = generateEnvironmentContent();
  console.log(content)
  process.chdir(`src/environment`); // This is the directory where you created the environment file. you can use your own path, but for this I used the Angular default environment directory
  fs.writeFile(fileName, content, (err) => { (err) ? console.log(err) : console.log('env is generated!') });
  })(); 