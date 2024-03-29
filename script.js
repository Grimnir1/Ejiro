let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints; // Check if the device supports touch input

    if (isTouchDevice) {
      document.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        if (!this.rotating) {
          this.mouseX = touch.clientX;
          this.mouseY = touch.clientY;
          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;
        }
        const dirX = touch.clientX - this.touchX;
        const dirY = touch.clientY - this.touchY;
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;
        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = (180 * angle) / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        if (this.rotating) {
          this.rotation = degrees;
        }
        if (this.holdingPaper) {
          if (!this.rotating) {
            this.currentPaperX += this.velX;
            this.currentPaperY += this.velY;
          }
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      });

      paper.addEventListener('touchstart', (e) => {
        if (this.holdingPaper) return;
        this.holdingPaper = true;
        paper.style.zIndex = highestZ;
        highestZ += 1;
        const touch = e.touches[0];
        this.touchX = touch.clientX;
        this.touchY = touch.clientY;
        this.prevMouseX = this.touchX;
        this.prevMouseY = this.touchY;
      });

      window.addEventListener('touchend', () => {
        this.holdingPaper = false;
        this.rotating = false;
      });
    } else {
      document.addEventListener('mousemove', (e) => {
        if (!this.rotating) {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;
        }
        const dirX = e.clientX - this.mouseX;
        const dirY = e.clientY - this.mouseY;
        const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
        const dirNormalizedX = dirX / dirLength;
        const dirNormalizedY = dirY / dirLength;
        const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
        let degrees = (180 * angle) / Math.PI;
        degrees = (360 + Math.round(degrees)) % 360;
        if (this.rotating) {
          this.rotation = degrees;
        }
        if (this.holdingPaper) {
          if (!this.rotating) {
            this.currentPaperX += this.velX;
            this.currentPaperY += this.velY;
          }
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
          paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
        }
      });

      paper.addEventListener('mousedown', (e) => {
        if (this.holdingPaper) return;
        this.holdingPaper = true;
        paper.style.zIndex = highestZ;
        highestZ += 1;
        if (e.button === 0) {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
        }
        if (e.button === 2) {
          this.rotating = true;
        }
      });

      window.addEventListener('mouseup', () => {
        this.holdingPaper = false;
        this.rotating = false;
      });
    }
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});