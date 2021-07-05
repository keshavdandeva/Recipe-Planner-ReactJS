export default async function postData(url = '', data = {}, method = 'POST') {
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data)
  });
  return response.json(); 
}

