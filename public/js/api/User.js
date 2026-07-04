/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения.
 * */

class User {
  static URL = '/user';

  static setCurrent(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static current() {
    const user = localStorage.getItem('user');

    if (!user) {
      return undefined;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      return undefined;
    }
  }

  static fetch(callback) {
    createRequest({
      url: `${this.URL}/current`,
      method: 'GET',
      callback: (err, response) => {
        if (err) {
          this.unsetCurrent();
          return;
        }

        const { success, user } = response;

        if (success) {
          this.setCurrent(user);
        } else {
          this.unsetCurrent();
        }

        callback(err, response);
      },
    });
  }

  static login(data, callback) {
    createRequest({
      url: `${this.URL}/login`,
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        const { user } = response;

        if (response && user) {
          this.setCurrent(user);
        }

        callback(err, response);
      },
    });
  }

  static register(data, callback) {
    createRequest({
      url: `${this.URL}/register`,
      data,
      method: 'POST',
      callback: (err, response) => {
        const { success, user } = response;

        if (success) {
          User.setCurrent(user);
        }

        callback(err, response);
      },
    });
  }

  static logout(callback) {
    createRequest({
      url: `${this.URL}/logout`,
      method: 'POST',
      callback: (err, response) => {
        const { success } = response;

        if (success) {
          User.unsetCurrent();
        }

        callback(err, response);
      },
    });
  }
}
