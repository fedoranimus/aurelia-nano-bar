import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class NanoBarCustomElement {
    @bindable isLoading: boolean = false;
    @bindable progress: number | null = null;

    // Internal
    _progress: number = 0;
    _position: string = 'fixed';
    _height: number = 2;
    _transitionFunction: string = Transition.instant;

    private incTimer: NodeJS.Timer;

    constructor(private element: Element) {
    }

    bind() {
        if (typeof this.isLoading !== 'boolean') throw new Error('is-loading is not bound properly to a boolean value; did you forget to call .bind?');
        if ((this.progress !== null) && (typeof this.progress !== 'number')) throw new Error('progress is not bound properly to a number or null; did you forget to call .bind?');     
    }

    async attached() {
        this.intializePosition();
        if (this.isLoading)
            this.start();
    }

    private intializePosition() {
        if (this.element.parentElement && this.element.parentElement.nodeName.toLowerCase() !== 'body') {
            this._position = 'relative';
        }
    }

    // Show bindable has changed
    isLoadingChanged(isShown: boolean, wasShown: boolean) {
        if (isShown) {
            if (this._progress === 100) this._progress = 0; // Reset the progress
            this.start();
        }

        if (wasShown && !isShown) {
            this.complete();
        }
    }

    // Progress bindable has changed
    progressChanged(newProgress: number) {
        if (typeof newProgress === 'number') {
            clearInterval(this.incTimer);
            this._progress = newProgress;
        } else {
            this._progress = 0;
        }
    }

    private start() {
        this._height = 2;
        setTimeout(() => {
            this._transitionFunction = Transition.ease;

            if (this.progress === null)
                this._progress = 5;

            this.incTimer = setInterval(() => this.autoincrement(), 500);
        }, 100);
    }

    private complete() {
        if (this.incTimer) clearInterval(this.incTimer);
        this._progress = 100;
        setTimeout(() => {
            this._height = 0;
            setTimeout(() => {
                this._transitionFunction = Transition.instant;
                this._progress = 0;
            }, 300);
        }, 300);

        
    }
    
    private autoincrement() {
        // Don't increment if the progress has gone over 90%
        if (this._progress > 90)
            return;

        // increment by a random integer value between 1% and 10%
        this._progress = this._progress + this.randomIntRange(1, 10);
    }

    private randomIntRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    detached() {
        if (this.incTimer) clearInterval(this.incTimer);
    }
}

enum Transition {
    instant = 'all 0ms linear',
    ease = 'all 200ms ease'
}

//TODO: Clean up start transition