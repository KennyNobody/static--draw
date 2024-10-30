import {Fancybox} from "@fancyapps/ui";
import {App} from "./app";

class Modal {
    parent: App;
    private readonly buttonId = '#button-widget';
    private readonly modalId = '#modal-wheel';
    private readonly disableModalKey = "modalDisabled";
    private readonly lastClosedDateKey = "lastModalCloseDate";

    constructor(parent: App) {
        this.parent = parent;
        this.initModal();
        this.showModalAfterDelay();
    }

    private initModal = () => {
        const link = document.querySelector(this.buttonId);

        link.addEventListener('click', () => {
            Fancybox.show([{ src: this.modalId, type: "inline" }], {
                mainClass: "fancybox-wheel",
                on: {
                    done: (el) => {
                        this.parent.initForms(el.container);
                        this.setMetric();
                    }
                }
            });
        });
    };

    private showModalAfterDelay = () => {
        setTimeout(() => {
            const isModalDisabled = localStorage.getItem(this.disableModalKey) === "true";
            const lastClosedDate = localStorage.getItem(this.lastClosedDateKey);

            if (isModalDisabled) return;

            const oneDayInMs = 24 * 60 * 60 * 1000;
            const now = Date.now();

            if (!lastClosedDate || now - new Date(lastClosedDate).getTime() > oneDayInMs) {
                Fancybox.show([{ src: this.modalId, type: "inline" }], {
                    mainClass: "fancybox-wheel",
                    on: {
                        done: (el) => {
                            this.parent.initForms(el.container);
                            this.setMetric();
                        },
                        destroy: this.handleModalClose
                    }
                });
            }
        }, 30000);
    };

    private handleModalClose = () => {
        const button = document.querySelector("#button");

        if (button) {
            button.addEventListener("click", () => {
                localStorage.setItem(this.disableModalKey, "true");
                Fancybox.close();
            });
        }

        if (!localStorage.getItem(this.disableModalKey)) {
            localStorage.setItem(this.lastClosedDateKey, new Date().toISOString());
        }
    }

    setMetric = () => {
        // @ts-ignore
        if (window?.ym) window.ym(62003239,'reachGoal','pokaz_popup_koleso_fortuny')
    }
}

export {
    Modal,
}
