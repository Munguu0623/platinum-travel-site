import throttle from 'lodash/throttle';
import debounce from "lodash/debounce";

class RevealOnScroll {
    constructor(els, revealPoint){
        this.revealPoint = revealPoint;
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.hideInitially();
        this.scrollThrotlle = throttle(this.calcCaller, 200).bind(this);
        this.events();
    }

    events(){
        window.addEventListener("scroll", this.scrollThrotlle)
        window.addEventListener("resize", debounce (() => {
            console.log("Browser resiz hiigdlee");
            this.browserHeight = window.innerHeight;
        },300));
    }

    calcCaller(){
        console.log("Scroll функц ажиллаа");
            this.itemsToReveal.forEach(el => {
                if(el.isRevealed == false){
                    this.calculateIfScrolledTo(el);
                }
            });
    }
    
    calculateIfScrolledTo(el) {
       if (window.scrollY + this.browserHeight > el.offsetTop){
        console.log("tootsoolol hiigdej baina");
        let scrollPersent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
        if(scrollPersent < this.revealPoint){
            el.classList.add("reveal-item--is-visible")
            el.isRevealed = true;
            if(el.isLastitem){
                window.removeEventListener("scroll", this.scrollThrotlle);
            }
        }
       }
    }

    hideInitially() {
        this.itemsToReveal.forEach(el => {
            el.classList.add("reveal-item");
            el.isRevealed = false;
        });
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastitem = true;
    }
}

export default RevealOnScroll;