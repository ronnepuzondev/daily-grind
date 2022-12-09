import { getToken } from './users-service';

const herokuURL = 'https://damp-bastion-04346.herokuapp.com'

export default async function sendRequest(url, method = 'GET', payload = null) {
  // Fetch accepts an options object as the 2nd argument
  // used to include a data payload, set headers, etc. 
  const options = { method };
  if (payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }
  const token = getToken();
  if (token) {
    // Ensure that headers object exists
    options.headers = options.headers || {};
    options.headers.Authorization = `Bearer ${token}`;
  }

const apiURL = process.env.DEVELOPMENT ? url : herokuURL + url

  const res = await fetch(apiURL, options);
  // res.ok will be false if the status code set to 4xx in the controller action
  if (res.ok) return res.json();
  throw new Error('Bad Request');
}