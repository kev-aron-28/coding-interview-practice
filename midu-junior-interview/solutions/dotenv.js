import fs, { read } from 'node:fs'
import readline from 'node:readline';


class Dotenv {
  constructor(
  ) { }

  async config({ path = '.env' } = {}) {
    try {
      const stream = fs.createReadStream(path, 'utf-8');

      const rl = readline.createInterface({ input: stream });

      for await (const linea of rl) {
        const trimmed = linea.trim();

        if (!trimmed || trimmed.startsWith('#')) continue;

        const index = trimmed.indexOf('=');
        if (index === -1) continue;

        const key = trimmed.slice(0, index).trim();
        let value = trimmed.slice(index + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        process.env[key] = value;
      }


    } catch (error) {
      return null;
    }
  }
}

const env = new Dotenv();

await env.config()

console.log(process.env)
