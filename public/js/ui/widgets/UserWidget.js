/**
 * Класс UserWidget отвечает за
 * отображение информации о имени пользователя
 * после авторизации или его выхода из системы
 * */

class UserWidget {
  #element;

  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент в конструктор');
    }

    this.#element = element;
  }

  update() {
    const user = User.current();
    const userNameEl = this.#element.querySelector('.user-name');

    if (user) {
      userNameEl.textContent = user.name;
    }
  }
}
