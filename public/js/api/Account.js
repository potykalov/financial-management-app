/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * */

class Account extends Entity {
  static URL = '/account';

  static get(id = '', callback) {
    createRequest({
      url: this.URL,
      data: {
        id,
      },
      method: 'GET',
      callback,
    });
  }
}
