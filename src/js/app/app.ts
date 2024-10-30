import {Input} from "./input";
import {Form} from "./form";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import {Modal} from "./modal";

class App {
    constructor() {
        this.init();
        this.initForms();
        this.initModals();
    }

    init = () => {
        console.log('App Inited');
    }

    initForms = (el?: HTMLElement) => {
        const parent = el ? el : document;
        const els: NodeListOf<HTMLElement> = parent.querySelectorAll('[data-form="main"]');

        els.forEach((item) => new Form(item));
    }

    initModals = () => {
        new Modal(this);
    }
}

export {App};

