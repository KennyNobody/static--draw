import IMask from 'imask';

class Input {
    el: HTMLElement;
    constructor(el: HTMLElement) {
        this.el = el;
        const type = el.getAttribute('data-input');

        if (type) this.initMask();
    }

    initMask = () => {
        const field = this.el.querySelector('input');
        const maskOptions = {
            mask: '+{7} (000) 000-00-00'
        };
        const mask = IMask(field, maskOptions);
    }
}

export {
    Input,
}
