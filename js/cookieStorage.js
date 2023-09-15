function saveCityToCookie(value) {
  document.cookie = `${encodeURIComponent('currentCity')}=${value}; expires=${Date.now() + 36000000}`;
}

function getCityFromCookie() {
  let key = encodeURIComponent('currentCity');
  let data = document.cookie;
  data  = data.split(';');
  data = data.map(elem => elem.split('=').map(item => item.trim()));
  if (data[0] == '') {
    return '';
  }
  let res; 
  
  res = data.filter(elem => {
    return elem[0] === key;
  });
  return res[0][1];
}


export {saveCityToCookie, getCityFromCookie};