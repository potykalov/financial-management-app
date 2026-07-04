/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  #element;

  constructor(element) {
    this.#element = element;

    this.registerEvents();
  }

  registerEvents() {
    this.#element.addEventListener('click', (e) => {
      const createIncomeButtonEl = e.target.closest('.create-income-button');
      const createExpenseButtonEl = e.target.closest('.create-expense-button');

      if (createIncomeButtonEl) {
        App.getModal('newIncome').open();
      }

      if (createExpenseButtonEl) {
        App.getModal('newExpense').open();
      }
    });
  }
}
