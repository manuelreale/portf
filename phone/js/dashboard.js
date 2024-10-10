export class Dashboard {
    constructor() {
        this.dashboardContainer = document.querySelector('.dashboard-section');
        this.appListContainer = null;
        this.pagesListContainer = null;
        this.appListSection = null;
        this.appChildren = null;
        this.dashboardBackground = document.querySelector('.dashboard-background');

        this.appHeight = null;
        this.appGap = null;
        this.appListMargin = null;
        this.windowHeight = null;

        
        this.appIndex = 0;
        this.initDashboard();
    }

    handleJoystick(direction){

        if(direction == "down"){
            this.slideNextApp(1);
        }
        if(direction == "up"){
            this.slideNextApp(-1);
        }
        
    }

    initDashboard(){
        this.windowHeight = window.innerHeight;

        this.appListContainer = document.querySelector('.dashboard-apps');
        const computedStyleApplist = window.getComputedStyle(this.appListContainer);

        this.pagesListContainer = document.querySelector('.dashboard-pages');

        this.appChildren = this.appListContainer.children;

        let app =  this.appChildren[0];
        const computedStyleApp = window.getComputedStyle(app);

        this.appHeight = parseFloat(computedStyleApp.height);
        this.appGap =  parseFloat(computedStyleApplist.gap);
        this.appListMargin =  parseFloat(computedStyleApplist.padding);

    }

    slideNextApp(index) {
        // Check if we are at the first or last item and should not proceed
        if ((index == -1 && this.appIndex == 0) || (index == 1 && this.appIndex == this.appChildren.length - 1)) {
            return; // Stop executing if attempting to go past the bounds
        }
    
        // Remove the active class from the current item
        this.appChildren[this.appIndex].classList.remove('dashboard-app--active');
        this.dashboardBackground.classList.remove(`dashboard-background--${this.appIndex}`);
    
        // Update appIndex
        this.appIndex += index;
    
        // Calculate the new margin
        let newMargin = this.appIndex * (this.appHeight + this.appGap) * -1;
        this.appListContainer.style.marginTop = newMargin + "px";
        this.pagesListContainer.style.marginTop = this.appIndex * -100 + "vh";
    
        // Add the active class to the new item
        this.appChildren[this.appIndex].classList.add('dashboard-app--active');
        this.dashboardBackground.classList.add(`dashboard-background--${this.appIndex}`);
    }
    showDashboard(){
        this.dashboardContainer.classList.remove('dashboard-section--hidden');
    }
    hideDashboard(){
        this.dashboardContainer.classList.add('dashboard-section--hidden');
    }
}