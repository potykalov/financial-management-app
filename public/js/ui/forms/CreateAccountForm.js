/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */

class CreateAccountForm extends AsyncForm {
  onSubmit(data) {
    Account.create(data, (err, response) => {
      if (response.success) {
        App.getModal('createAccount').close();

        this.element.reset();

        App.update();
      }
    });
  }
}
