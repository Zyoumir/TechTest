import fetch from 'node-fetch';

const url = `http://127.0.0.1:7003/documents`;

export default async function getData(){
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.data
      } catch (error) {
        console.log(error);
        return error
      }
}
