// learnt from https://www.youtube.com/watch?v=POX3dT-pB4E&t=21s
//init on Dom Load
document.addEventListener("DOMContentLoaded", init);
function init() {
  const txtElement = document.querySelector(".txt-type");
  if (!txtElement) return;
  const words = JSON.parse(txtElement.getAttribute("data-words")!);
  const wait = txtElement.getAttribute("data-wait");
  new (TypeWriter as any)(txtElement, words, wait);
}

class TypeWriter {
  txtElement: Element;
  words: any;
  txt: string;
  wordIndex: number;
  wait: number;
  isDeleting: boolean;
  constructor(txtElement: Element, words: any, wait: string) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = ""; //the character that are present on screen in typewriter effect
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  type() {
    //current index of word
    const current = this.wordIndex % this.words.length;
    //get full text of current word
    const fullTxt = this.words[current];
    //check if deleting
    if (this.isDeleting) {
      //remove character
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      //add character
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    // Insert txt into DOM element
    this.txtElement.innerHTML = `<span>${this.txt}</span>`;
    //Initial Type speed
    let typeSpeed = 100;
    //increase speed if deleting
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    //if word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      //make pause at end
      typeSpeed = this.wait;
      //set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      //set delete to false
      this.isDeleting = false;
      //move to next word
      this.wordIndex++;
      //pause before start typing
      typeSpeed = 500;
    }
    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}
