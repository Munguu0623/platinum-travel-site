import throttle from "lodash/throttle"
import debounce from "lodash/debounce"


class StickyHeader {
    constructor(){
        this.siteHeader = document.querySelector('.site-header');
        this.pageSection = document.querySelectorAll('.page-section')
        this.browserHeight = window.innerHeight;
        this.previoussScrolY = window.scrollY;
        this.events()
    }


events(){
    window.addEventListener("scroll" , throttle(() => this.runOnScroll(), 200));
    window.addEventListener("resize", debounce (() => {
        console.log("Browser resiz hiigdlee");
        this.browserHeight = window.innerHeight;
    },300));
}

runOnScroll(){
    this.checkScrolldirection();
    if(window.scrollY > 60){
        this.siteHeader.classList.add("site-header--dark")
    }else{
        this.siteHeader.classList.remove("site-header--dark")
    }
    this.pageSection.forEach(el => this.calcSection(el));
}

    checkScrolldirection() {
        if (window.scrollY > this.previoussScrolY){
            this.scrollDirection = "Down";
        }else {
            this.scrollDirection = " up";

        }
        this.previoussScrolY = window.scrollY;
    }

    calcSection(el){
        if (window.scrollY  + this.browserHeight > el.offsetTop && window.scrolY < el.offsetTop + el.offsetHeight) {
            let scrollPersent = (el.getBoundingClientRect().y / this.browserHeight) * 100;
            if (scrollPersent < 18 && scrollPersent -0.1 && this.scrollDirection == "down" || scrollPersent < 33 && this.scrollDirection == "up" ){
                let matchingLink = el.getAttribute('data-matching-link');
                document.querySelectorAll(`.primary-nav a:not(&{matchingLink})`).forEach(el => el.classList.remove('is-current-link'));
                document.querySelector(matchingLink).classList.add("is-qurrent-link");
            }
        }
    }
}

export default StickyHeader;