/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  #element;

  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент в конструктор');
    }

    this.#element = element;

    this.registerEvents();

    this.update();
  }

  registerEvents() {
    const createAccountButtonEl = document.querySelector('.create-account');

    createAccountButtonEl.addEventListener('click', () => {
      App.getModal('createAccount').open();
    });

    this.#element.addEventListener('click', (e) => {
      e.preventDefault();

      const targetAccountButtonEl = e.target.closest('.account');

      this.onSelectAccount(targetAccountButtonEl);
    });
  }

  update() {
    if (User.current()) {
      Account.list({}, (err, response) => {
        const counts = response.data;

        this.clear(); // куда ставить?
        this.renderItems(counts);
      });
    }
  }

  clear() {
    const accountEls = this.#element.querySelectorAll('.account');

    accountEls.forEach((accountEl) => {
      accountEl.remove();
    });
  }

  onSelectAccount(element) {
    const accountsPanelEl = document.querySelector('.accounts-panel');
    const accountButtonEls = accountsPanelEl.querySelectorAll('.account');
    const dataId = element.dataset.id;

    accountButtonEls.forEach((accountButton) => {
      accountButton.classList.remove('active');
    });

    element.classList.add('active');

    App.showPage('transactions', { account_id: dataId });
  }

  getAccountHTML(item) {
    const { id, name, sum } = item;
    const formattedSum = sum.toLocaleString('ru-RU', {
      style: 'currency',
      currency: 'RUB',
    });

    return `<li class="account" data-id="${id}">
              <a href="#">
                <span>${name}</span> /
                <span>${formattedSum}</span>
              </a>
            </li>`;
  }

  renderItems(data) {
    const accountsPanelEl = document.querySelector('.accounts-panel');
    let allCountsHtml = '';

    data.forEach((count) => {
      const countHtml = this.getAccountHTML(count);

      allCountsHtml += countHtml;
    });

    accountsPanelEl.insertAdjacentHTML('beforeend', allCountsHtml);
  }
}
