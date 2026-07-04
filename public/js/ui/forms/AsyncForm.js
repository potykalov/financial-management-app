/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы.
 * */

class AsyncForm {
  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент в конструктор');
    }

    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();

      this.submit();
    });
  }

  getData() {
    const formData = new FormData(this.element);

    return Object.fromEntries(formData);
  }

  onSubmit(options) {}

  submit() {
    this.onSubmit(this.getData());
  }
}
