export const getIp = () => {
  const req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      JSON.parse(req.response);
    }
  };

  req.open('GET', 'http://ip-api.com/json', true);
  req.send();
};