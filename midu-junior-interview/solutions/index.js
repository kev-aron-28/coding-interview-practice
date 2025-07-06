import net from 'node:net'
import fs from 'node:fs'


// 1. 
export const ping = (ip, callback) => {
  const startTime = process.hrtime()

  const client = net.connect({ port: 80, host: ip }, () => {
    client.end()
    callback(null, { time: process.hrtime(startTime), ip });
  })

  client.on('error', (err) => {
    client.end()
    callback(err, null)
  })
}

ping('google.com', (err, info) => {
  if (err) console.error(err)
  else console.log(info)
})

// 2. 
export function obtenerDatosPromise() {
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: 'datos importantes' })
    }, 2000);
  });

  return result;
}


// 3.
export function procesarArchivo(callback) {
  fs.readFile('../input.txt', 'utf8', (error, contenido) => {
    if (error) {
      console.error('Error leyendo archivo:', error.message);
      return callback(error);
    }

    const textoProcesado = contenido.toUpperCase();

    fs.writeFile('output.txt', textoProcesado, error => {
      if (error) {
        return callback(error);
      }

      console.log('Archivo procesado y guardado con éxito');
      callback(null);
    });
  });
}


export async function procesarArchivoPromise() {
  // fs.readFile('../input.txt', 'utf8', (error, contenido) => {
  //   if (error) {
  //     console.error('Error leyendo archivo:', error.message);
  //     return callback(error);
  //   }

  //   const textoProcesado = contenido.toUpperCase();

  //   fs.writeFile('output.txt', textoProcesado, error => {
  //     if (error) {
  //       return callback(error);
  //     }

  //     console.log('Archivo procesado y guardado con éxito');
  //     callback(null);
  //   });
  // });

  const content = await fs.promises.readFile('../input.txt', 'utf-8');
  console.log('CONTENT: ' + content)

  await fs.promises.writeFile('../output.txt', content.toUpperCase());
}


export async function leerArchivos() {
  const contenidos = await Promise.all([
    fs.promises.readFile('archivo1.txt', 'utf8'),
    fs.promises.readFile('archivo2.txt', 'utf8'),
    fs.promises.readFile('archivo3.txt', 'utf8')
  ])


  return contenidos.map(c => c.trim()).join(' ')
}
