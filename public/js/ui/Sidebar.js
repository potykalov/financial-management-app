/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */

class Sidebar {
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  static initToggleButton() {
    const sidebarToggleEl = document.querySelector('.sidebar-toggle');
    const bodyEl = document.querySelector('body');

    sidebarToggleEl.addEventListener('click', (e) => {
      e.preventDefault();

      bodyEl.classList.toggle('sidebar-open');
      bodyEl.classList.toggle('sidebar-collapse');
    });
  }

  static initAuthLinks() {
    const registerButtonEl = document.querySelector('.menu-item_register > a');
    const registerModal = App.getModal('register');
    const loginButtonEl = document.querySelector('.menu-item_login > a');
    const loginModal = App.getModal('login');
    const logoutButtonEl = document.querySelector('.menu-item_logout > a');

    registerButtonEl.addEventListener('click', (e) => {
      e.preventDefault();

      registerModal.open();
    });

    loginButtonEl.addEventListener('click', (e) => {
      e.preventDefault();

      loginModal.open();
    });

    logoutButtonEl.addEventListener('click', (e) => {
      e.preventDefault();

      User.logout((err, response) => {
        if (err) {
          return;
        }

        if (response.success) {
          App.setState('init');
        }
      });
    });
  }
}
