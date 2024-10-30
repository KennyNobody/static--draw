import axios from "axios";

class Form {
    el: HTMLElement;
    agreement: HTMLInputElement;
    button: HTMLButtonElement;
    message: HTMLElement;
    wheel: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;
        this.init();
    }

    init = () => {
        const checkbox: HTMLInputElement = this.el.querySelector('[data-form="agreement"]');
        const button: HTMLButtonElement = this.el.querySelector('[data-form="button"]');
        const buttonExample = document.querySelector('#button-wheel');

        if (checkbox && button) {
            this.agreement = checkbox;
            this.button = button;
            this.agreement.addEventListener('change', () => this.toggleAgreement());
            this.toggleAgreement();
        }

        this.el.addEventListener('submit', (e: SubmitEvent) => this.submitForm(e));

        if (buttonExample) {
            buttonExample.addEventListener('click', () => {
                this.animateWheel();
            });
        }
    }

    toggleAgreement = () => {
        if (this.agreement.checked) {
            this.button.removeAttribute('disabled');
        } else {
            this.button.setAttribute('disabled', 'disabled');
        }
    }

    animateWheel = () => {
        this.wheel = document.querySelector('[data-wheel="main"]');
        console.log(this.wheel);

        this.wheel.classList.add('animate');

        if (this.wheel) {
            this.wheel.addEventListener("animationend", () => {
                // this.wheel.classList.remove('animate');
                this.showMessage();
            });
        }
    }

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();

        const url = this.el.getAttribute('action');
        const formData = new FormData();

        const field: HTMLInputElement = this.el.querySelector('[data-form="input"]');
        formData.append(field.name, field.value);
        this.message.innerHTML = 'Отправка...';

        axios.post(url, formData)
            .then((response) => {
                this.message.innerHTML = 'Отправлено!'
                this.animateWheel();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setTimeout(() => {
                    this.message.innerHTML = 'Забрать подарок'
                }, 3000);
            });
    }

    showMessage = () => {
        const content = this.el.querySelector('[data-form="content"]');
        const result = this.el.querySelector('[data-form="result"]');

        if (content && result) {
            content.setAttribute('hidden', 'hidden');
            result.removeAttribute('hidden');
        }
    }
}

export {
    Form,
}
