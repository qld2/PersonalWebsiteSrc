export default function getFileAsString(url:string, successCallback:(result:string)=>void) {
  const headers = new Headers();
  headers.append('Accept', 'text');

  const method:string = 'GET';
  const options = {
    method,
    headers,
  };

  fetch(url, options)
    .then((res) => res.text())
    .then((txt) => successCallback(txt));
}
