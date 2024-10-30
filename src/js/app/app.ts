import {Input} from "./input";
import {Form} from "./form";

class App {
    constructor() {
        this.init();
        this.initInputs();
        this.initForms();
    }

    init = () => {
        console.log('App Inited');
    }

    initInputs = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-input]');

        els.forEach((item) => new Input(item));
    }

    initForms = () => {
        const els: NodeListOf<HTMLElement> = document.querySelectorAll('[data-form="main"]');

        els.forEach((item) => new Form(item));
    }
}

export {App};

