/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  constructor(element) {
    super(element);

    this.renderAccountsList();
  }

  renderAccountsList() {
    Account.list({}, (err, response) => {
      if (err || !response?.success) {
        return;
      }

      const expenseAccountsListEl = document.querySelector(
        '#expense-accounts-list',
      );
      const incomeAccountsListEl = document.querySelector(
        '#income-accounts-list',
      );

      const { data: accounts } = response;

      const accountsListHtml = accounts
        .map((account) => {
          const { id, name } = account;

          return `<option value="${id}">${name}</option>`;
        })
        .join('');

      expenseAccountsListEl.innerHTML = accountsListHtml;
      incomeAccountsListEl.innerHTML = accountsListHtml;
    });
  }

  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (err || !response?.success) {
        alert(response.error || 'Произошла ошибка');
        return;
      }

      this.element.reset();

      App.getModal('newExpense').close();
      App.getModal('newIncome').close();

      App.update();
    });
  }
}
