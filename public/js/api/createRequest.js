/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  const { url, data = {}, method, callback } = options;

  let body = null;
  let requestUrl = url;
  const xhr = new XMLHttpRequest();

  xhr.responseType = 'json';

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      callback(null, xhr.response);
    } else {
      callback(new Error('В процессе оправки на сервер возникла ошибка'));
    }
  };

  xhr.onerror = () => {
    callback(new Error('В процессе отправки на сервер возникла ошибка'));
  };

  if (method === 'GET') {
    const paramsString = new URLSearchParams(data).toString();

    if (paramsString) {
      requestUrl += `?${paramsString}`;
    }
  } else {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    body = formData;
  }

  xhr.open(method, requestUrl);
  xhr.send(body);
};
