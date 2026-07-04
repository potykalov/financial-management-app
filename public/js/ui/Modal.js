/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * */

class Modal {
  constructor(element) {
    if (!element) {
      throw new Error('Передан пустой элемент в конструктор');
    }

    this.element = element;

    this.registerEvents();
  }

  registerEvents() {
    const closeButtons = this.element.querySelectorAll(
      '[data-dismiss="modal"]',
    );

    closeButtons.forEach((closeButton) => {
      closeButton.addEventListener('click', (e) => {
        this.onClose(e);
      });
    });
  }

  onClose(e) {
    this.close();
  }

  open() {
    this.element.style.display = 'block';
  }

  close() {
    this.element.style.removeProperty('display');
  }
}
