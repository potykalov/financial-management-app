/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  #element;
  #lastOptions;

  constructor(element) {
    if (!element) {
      throw new Error('передан пустой элемент в конструктор');
    }

    this.#element = element;

    this.registerEvents();
  }

  update() {
    this.render(this.#lastOptions);
  }

  registerEvents() {
    this.#element.addEventListener('click', (e) => {
      const removeAccountButtonEl = e.target.closest('.remove-account');
      const removeTransactionButtonEl = e.target.closest(
        '.transaction__remove',
      );

      if (removeAccountButtonEl) {
        this.removeAccount();
      }

      if (removeTransactionButtonEl) {
        const idTransaction = removeTransactionButtonEl.dataset.id;

        this.removeTransaction(idTransaction);
      }
    });
  }

  removeAccount() {
    if (!this.#lastOptions) {
      return;
    }

    if (confirm('Вы действительно хотите удалить счёт?')) {
      Account.remove(
        {
          id: this.#lastOptions.account_id,
        },
        (err, response) => {
          if (response.success) {
            App.updateWidgets();
            App.updateForms();
          }
        },
      );
    }
  }

  removeTransaction(id) {
    console.log(id);

    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(
        {
          id: id,
        },
        (err, response) => {
          if (response.success) {
            App.update();
          }
        },
      );
    }
  }

  render(options) {
    if (!options) {
      return;
    }

    this.#lastOptions = options;
    const accountId = options.account_id;

    Account.get(accountId, (err, response) => {
      if (response.success) {
        const account = response.data.find((item) => {
          return item.id === accountId;
        });

        this.renderTitle(account.name);
      }
    });

    Transaction.list({ account_id: accountId }, (err, response) => {
      if (response.success) {
        this.renderTransactions(response.data);
      }
    });
  }

  clear() {
    this.renderTransactions([]);

    this.renderTitle('Название счёта');

    this.#lastOptions = null;
  }

  renderTitle(name) {
    const title = this.#element.querySelector('.content-title');

    title.textContent = name;
  }

  formatDate(date) {
    const parsedDate = new Date(date.replace(' ', 'T'));
    const formattedDate = new Intl.DateTimeFormat('ru-Ru', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsedDate);
    const formattedDateToString = formattedDate.toString();

    return formattedDateToString;
  }

  getTransactionHTML(item) {
    const { name, created_at: createdAt, sum, id } = item;
    const formattedDate = this.formatDate(createdAt);
    const formattedSum = sum.toLocaleString('ru-RU');

    const transactionHtml = `
      <div class="transaction transaction_expense row">
          <div class="col-md-7 transaction__details">
            <div class="transaction__icon">
                <span class="fa fa-money fa-2x"></span>
            </div>
            <div class="transaction__info">
                <h4 class="transaction__title">${name}</h4>
                <div class="transaction__date">${formattedDate}</div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="transaction__summ">
                ${formattedSum} <span class="currency">₽</span>
            </div>
          </div>
          <div class="col-md-2 transaction__controls">
              <button class="btn btn-danger transaction__remove" data-id="${id}">
                  <i class="fa fa-trash"></i>  
              </button>
          </div>
      </div>
      `;

    return transactionHtml;
  }

  renderTransactions(data) {
    const contentEl = this.#element.querySelector('.content');

    contentEl.innerHTML = '';

    data.forEach((transaction) => {
      const transactionHTML = this.getTransactionHTML(transaction);

      contentEl.insertAdjacentHTML('beforeend', transactionHTML);
    });
  }
}
