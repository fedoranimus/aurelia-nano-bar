import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class NanoBar {
    @bindable({ primaryProperty: true }) show: boolean = false;
    @bindable progress: number | undefined = undefined;

    private incTimer: NodeJS.Timer;

    constructor(private element: HTMLDivElement) {
        this.intializePosition();
    }

    private intializePosition() {
        if (this.element.nodeName.toLowerCase() !== 'body') {
            this.setProperty(CSSVariables.position, 'relative');
        }
    }

    // Show bindable has changed
    showChanged(isShown: boolean) {
        if (isShown) {
            if (this.progress === undefined)
                this.progress = 10;
            
            this.incTimer = setInterval(this.autoincrement, 300);
        }

        if (!isShown) {
            clearInterval(this.incTimer);
            this.complete();
        }
    }

    // Progress bindable has changed
    progressChanged(newProgress: number) {
        this.setProperty(CSSVariables.progressWidth, newProgress);
    }

    private complete() {
        this.progress = 100;
        this.setProperty(CSSVariables.barHeight, 0);
    }
    
    private autoincrement() {
        // Don't increment if the progress is manually set, or it's gone over 90%
        if (this.progress === undefined || this.progress > 90)
            return;

        // increment by a random integer value between 2% and 10%
        this.progress = this.progress + this.randomIntRange(2, 10);
    }

    private setProperty(propertyName: string, value: number|string) {
        if (typeof value === 'number')
            value = value.toString();

        switch (propertyName) {
            case CSSVariables.progressWidth:
                value = value + '%';
                break;
        }

        this.element.style.setProperty(propertyName, value);
    }

    private randomIntRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

enum CSSVariables {
    barHeight = '--nano-height',
    progressWidth = '--nano-progress',
    position = '--nano-position'
}