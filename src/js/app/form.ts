import axios from "axios";
import {Input} from "./input";

class Form {
    el: HTMLElement;
    agreement: HTMLInputElement;
    button: HTMLButtonElement;
    message: HTMLElement;
    wheel: HTMLElement;

    constructor(el: HTMLElement) {
        this.el = el;
        this.init();
        this.initInputs()
    }

    init = () => {
        this.message = this.el.querySelector('[data-form="message"]');
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

        if (localStorage.getItem('modalDisabled')) {
            this.blockWheel();
        }
    }

    initInputs = () => {
        const els: NodeListOf<HTMLElement> = this.el.querySelectorAll('[data-input]');

        els.forEach((item) => new Input(item));
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
                this.wheel.classList.remove('animate');
                this.wheel.classList.add('completed');
                this.showMessage();
            });
        }
    }

    blockWheel = () => {
        this.wheel.classList.add('completed');
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

                if (!localStorage.getItem('modalDisabled')) {
                    this.animateWheel();
                }

                localStorage.setItem('modalDisabled', "true");
                this.setMetric();
            })
            .catch((error) => {
                console.log(error);
                this.message.innerHTML = 'Ошибка'
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

    setMetric = () => {
        // @ts-ignore
        if (window?.ym) window.ym(62003239,'reachGoal','otpravka_form_koleso_fortuni')
    }
}

export {
    Form,
}
