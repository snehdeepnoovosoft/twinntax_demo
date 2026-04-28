import fs from 'fs';
import path from 'path';

export type LoginCredentials = {
  email: string;
  password: string;
};

type CredentialsFile = {
  ui: LoginCredentials;
  api: LoginCredentials;
};

const credentialsPath = path.resolve(process.cwd(), 'test-data', 'credentials.json');

function readCredentialsFile(): CredentialsFile {
  if (!fs.existsSync(credentialsPath)) {
    throw new Error(
      `Missing credentials file at ${credentialsPath}. Copy test-data/credentials.example.json to test-data/credentials.json and add your secrets locally.`
    );
  }

  return JSON.parse(fs.readFileSync(credentialsPath, 'utf-8')) as CredentialsFile;
}

export function getUiCredentials(): LoginCredentials {
  return readCredentialsFile().ui;
}

export function getApiCredentials(): LoginCredentials {
  return readCredentialsFile().api;
}
