class MobileMenu {
    constructor(){
     this.menuicon = document.querySelector(".site-header__menu-icon");
     this.menuContent = document.querySelector(".site-header__menu-content");
     this.siteHeader = document.querySelector(".site-header");
     this.events();
    }

    events(){
        this.menuicon.addEventListener('click', () => this.toggleTheMenu());
    }

    toggleTheMenu(){
        this.menuContent.classList.toggle("site-header__menu-content--is-visible");
        this.siteHeader.classList.toggle("site-header--is-expanded")
    }
}

export default MobileMenu;