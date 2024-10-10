export class ProcedureManager {
    constructor() {
        this.procedureIndex = 0;
        this.procedureNumbersContainer = document.querySelector('.procedure-numbers');
        this.numbersChildren = this.procedureNumbersContainer.children;

        this.procedurePagesContainer = document.querySelector('.procedure-pages');
        this.pagesChildren = this.procedurePagesContainer.children;

        this.numbersGap = null;
        this.numbersPadding = null;
        this.numbersHeight = null;
        this.numbersVisibleHeight = null;
        this.numberHeight = null;
        this.pageGap = null;
        this.pageWidth = null;

        this.currentPosition = "left";

        this.initSizing();

    }

    async initSizing() {
        await this.getNumberHeight();
        await this.getPageWidth();
        await this.setTitleHeights();
        setTimeout(() => {
             this.storeStylingParams();            
        }, 1000);
    }

    async getNumberHeight() {
        const computedStyleFirstNumber = window.getComputedStyle(this.procedureNumbersContainer.children[0]);
        this.numberHeight = parseFloat(computedStyleFirstNumber.height);
        return;
    }
    async getPageWidth(){
        const computedStylePagesContainer= window.getComputedStyle(this.procedurePagesContainer);
        this.pageWidth = parseFloat(computedStylePagesContainer.width);
        return;
    }

    async setTitleHeights() {
        // Convert pagesChildren to an array if it isn't already
        const pagesArray = Array.from(this.pagesChildren);

        pagesArray.forEach((child, index) => {
            const titleElement = child.querySelector('.procedure-title');
            const contentElement = child.querySelector('.procedure-content');
            console.log(contentElement, this.pageWidth);
            contentElement.style.width = this.pageWidth+"px";
            if (titleElement) {
                const titleHeight = titleElement.offsetHeight;
                const margin = titleHeight - this.numberHeight;
                const height = titleHeight;
                if (this.numbersChildren[index]) {
                    this.numbersChildren[index].style.marginBottom = `${margin}px`;
                    this.pagesChildren[index].style.height = `${height}px`;
                }
            }
        });
        return;
    }

    async storeStylingParams() {

        const computedStyleNumbers = window.getComputedStyle(this.procedureNumbersContainer);
        this.numbersGap = parseFloat(computedStyleNumbers.gap);
        this.numbersPadding = parseFloat(computedStyleNumbers.padding);
        this.numbersHeight = this.procedureNumbersContainer.offsetHeight;
        this.numbersVisibleHeight = window.innerHeight;

        const computedStylePagesContainer= window.getComputedStyle(this.procedurePagesContainer);
        this.pageGap = parseFloat(computedStylePagesContainer.gap);

        return;
    }

    navigatePopup(direction) {

        if (direction == "down" || direction == "up") {
            this.moveUpDown(direction);
        }
        if(direction == "left"){
            if(this.currentPosition == "right"){
                this.moveRight();
            }
        }
        if(direction == "right"){
            if(this.currentPosition == "left"){
                this.moveRight();
            }
        }
    }

    moveUpDown(direction) {
        if (direction == "up" && this.procedureIndex > 0) {
            this.removeNumberHighlight();
            this.removePageHighlight();
            this.procedureIndex--;
            this.addNumberHighlight();
            this.addPageHighlight()
            this.moveNumbers(direction);
        }
        else if (direction == "down" && this.procedureIndex < this.numbersChildren.length - 1) {
            this.removeNumberHighlight();
            this.removePageHighlight();
            this.procedureIndex++;
            this.addNumberHighlight();
            this.addPageHighlight()
            this.moveNumbers(direction);
        }
    }

    moveRight(){
        this.setPageHeights();
        this.setPagesExpanded();
    }

    setPagesExpanded(){
        this.procedurePagesContainer.classList.remove('procedure-pages--collapsed');
    }

    setPageHeights() {
        const pagesArray = Array.from(this.pagesChildren);
    
        pagesArray.forEach((child, index) => {
            // Get all children inside the current child
            const children = Array.from(child.children);
    
            // Calculate the total height
            let totalHeight = 0;
            children.forEach((subChild, subIndex) => {
                totalHeight += subChild.offsetHeight;
    
                // Add gap between elements, except after the last child
                if (subIndex < children.length - 1) {
                    totalHeight += this.pageGap;
                }
            });
    
            // Set the height of the current child to totalHeight in pixels
            child.style.height = `${totalHeight}px`;
        });
    }

    removeNumberHighlight() {
        this.numbersChildren[this.procedureIndex].classList.remove('procedure-number--active');
    }
    addNumberHighlight() {
        this.numbersChildren[this.procedureIndex].classList.add('procedure-number--active');
    }
    removePageHighlight() {
        this.pagesChildren[this.procedureIndex].classList.remove('procedure-page--active');
    }
    addPageHighlight() {
        this.pagesChildren[this.procedureIndex].classList.add('procedure-page--active');
    }

    moveNumbers(direction) {

        // move numbers
        // let numberMoveMargin = this.procedureIndex * (this.numbersGap + this.numberHeight) * -1;
        // this.procedureNumbersContainer.style.marginTop = numberMoveMargin+"px";
        // this.procedurePagesContainer.style.marginTop = numberMoveMargin+"px";
        console.log(this.numbersVisibleHeight, this.numbersHeight);

        if (this.numbersVisibleHeight < this.numbersHeight) {

            const stepSize = (this.numbersHeight - this.numbersVisibleHeight) / (this.numbersChildren.length - 1);
            const marginTop = (stepSize * (this.procedureIndex) * -1);
            this.procedureNumbersContainer.style.marginTop = marginTop + "px";
            this.procedurePagesContainer.style.marginTop = marginTop + "px";

        }

    }
}