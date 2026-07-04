/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * */

class Entity {
  static URL = '';

  static list(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'GET',
      callback,
    });
  }

  static create(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'PUT',
      callback,
    });
  }

  static remove(data, callback) {
    createRequest({
      url: this.URL,
      data,
      method: 'DELETE',
      callback,
    });
  }
}
