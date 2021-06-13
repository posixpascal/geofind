<template>
  <div class="box">
    <p id="text" class="text"></p>
    <p id="offscreen-text" class="offscreen-text"></p>
    <svg id="animatedletters"></svg>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";


@Component
export default class AnimatedLetters extends Vue {
  @Prop({type: String}) letters!: string;

  animation = "";
  text = "";

  // @ts-ignore
  mounted() {
    this.animation = this.letters;
    const colors = [
      {main: '#FBDB4A', shades: ['#FAE073', '#FCE790', '#FADD65', '#E4C650']},
      {main: '#F3934A', shades: ['#F7B989', '#F9CDAA', '#DD8644', '#F39C59']},
      {main: '#EB547D', shades: ['#EE7293', '#F191AB', '#D64D72', '#C04567']},
      {main: '#9F6AA7', shades: ['#B084B6', '#C19FC7', '#916198', '#82588A']},
      {main: '#5476B3', shades: ['#6382B9', '#829BC7', '#4D6CA3', '#3E5782']},
      {main: '#2BB19B', shades: ['#4DBFAD', '#73CDBF', '#27A18D', '#1F8171']},
      {main: '#70B984', shades: ['#7FBE90', '#98CBA6', '#68A87A', '#5E976E']}
    ];


    const selectSVG = (id: any) => {
      const el = document.getElementById(id);
      return new SVGElement(el);
    };

    const createSVG = (type: any) => {
      const el = document.createElementNS('http://www.w3.org/2000/svg', type);
      return new SVGElement(el);
    };

    class SVGElement {
      public element: any;

      constructor(element: any) {
        this.element = element;
      }

      set(attributeName: string, value: any) {
        this.element.setAttribute(attributeName, value);
      }

      style(property: string, value: any) {
        this.element.style[property] = value;
      }
    }

    const resizePage = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      svg.set('height', height);
      svg.set('width', width);
      svg.set('viewBox', `0 0 ${width} ${height}`);
      resizeLetters();
    }

    const resizeLetters = () => {
      textSize = width / (letters.length + 2);
      if (textSize > 100) textSize = 100;
      text.style.fontSize = `${textSize}px`;
      text.style.height = `${textSize}px`;
      text.style.lineHeight = `${textSize}px`;
      if (!offscreenText){
        return;
      }
      offscreenText.style.fontSize = `${textSize}px`;
      const textRect = text.getBoundingClientRect();
      textCenter = textRect.top + textRect.height / 2;
      positionLetters();
    };

    const positionLetters = () => {
      letters.forEach((letter: any) => {
        const timing = letter.shift ? 0.1 : 0;
        (window as any).TweenLite.to(letter.onScreen, timing, {
          x: letter.offScreen.offsetLeft + 'px',
          ease: (window as any).Power3.easeInOut
        });
        letter.shift = true;
      });
    }

    const animateLetterIn = (letter: any) => {
      const yOffset = (0.5 + Math.random() * 0.5) * textSize;
      (window as any).TweenLite.fromTo(letter, 0.4, {scale: 0}, {scale: 1, ease: (window as any).Back.easeOut});
      (window as any).TweenLite.fromTo(letter, 0.4, {opacity: 0}, {opacity: 1, ease: (window as any).Power3.easeOut});
      (window as any).TweenLite.to(letter, 0.2, {y: -yOffset, ease: (window as any).Power3.easeInOut});
      (window as any).TweenLite.to(letter, 0.2, {y: 0, ease: (window as any).Power3.easeInOut, delay: 0.2});
      const rotation = -50 + Math.random() * 100;
      (window as any).TweenLite.to(letter, 0.2, {rotation: rotation, ease: (window as any).Power3.easeInOut});
      (window as any).TweenLite.to(letter, 0.2, {rotation: 0, ease: (window as any).Power3.easeInOut, delay: 0.2});
    }

    const addDecor = (letter: any, color: any) => {
      setTimeout(() => {
        var rect = letter.getBoundingClientRect();
        const x0 = letter.offsetLeft + letter.offsetWidth / 2;
        const y0 = textCenter - textSize * 0.5;
        const shade = color.shades[Math.floor(Math.random() * 4)];
        for (var i = 0; i < 8; i++) addTri(x0, y0, shade);
        for (var i = 0; i < 8; i++) addCirc(x0, y0);
      }, 150);
    };

    const addTri = (x0: number, y0: number, shade: any) => {
      const tri: any = createSVG('polygon');
      const a = Math.random();
      const a2 = a + (-0.2 + Math.random() * 0.4);
      const r = textSize * 0.52;
      const r2 = r + textSize * Math.random() * 0.2;
      const x = x0 + r * Math.cos(2 * Math.PI * a);
      const y = y0 + r * Math.sin(2 * Math.PI * a);
      const x2 = x0 + r2 * Math.cos(2 * Math.PI * a2);
      const y2 = y0 + r2 * Math.sin(2 * Math.PI * a2);
      const triSize = textSize * 0.1;
      const scale = 0.3 + Math.random() * 0.7;
      const offset = triSize * scale;
      tri.set('points', `0,0 ${triSize * 2},0 ${triSize},${triSize * 2}`);
      tri.style('fill', shade);
      svg.element.appendChild(tri.element);
      (window as any).TweenLite.fromTo(tri.element, 0.6, {
        rotation: Math.random() * 360,
        scale: scale,
        x: x - offset,
        y: y - offset,
        opacity: 1
      }, {
        x: x2 - offset, y: y2 - offset, opacity: 0, ease: (window as any).Power1.easeInOut, onComplete: () => {
          svg.element.removeChild(tri.element);
        }
      });
    }

    const addCirc = (x0: number, y0: number) => {
      const circ: any = createSVG('circle');
      const a = Math.random();
      const r = textSize * 0.52;
      const r2 = r + textSize;
      const x = x0 + r * Math.cos(2 * Math.PI * a);
      const y = y0 + r * Math.sin(2 * Math.PI * a);
      const x2 = x0 + r2 * Math.cos(2 * Math.PI * a);
      const y2 = y0 + r2 * Math.sin(2 * Math.PI * a);
      const circSize = textSize * 0.05 * Math.random();
      circ.set('r', circSize);
      circ.style('fill', '#eee');
      svg.element.appendChild(circ.element);
      (window as any).TweenLite.fromTo(circ.element, 0.6, {x: x - circSize, y: y - circSize, opacity: 1}, {
        x: x2 - circSize, y: y2 - circSize, opacity: 0, ease: (window as any).Power1.easeInOut, onComplete: () => {
          (svg as any).element.removeChild((circ as any).element);
        }
      });
    }

    const addLetter = (char: string, i: number) => {
      const letter = document.createElement('span');
      const oLetter = document.createElement('span');
      letter.innerHTML = char;
      oLetter.innerHTML = char;
      text.appendChild(letter);
      const color = colors[i % colors.length];
      letter.style.color = color.main;
      if (!offscreenText){ return; }
      offscreenText.appendChild(oLetter);
      letters[i] = {offScreen: oLetter, onScreen: letter, char: char};
      animateLetterIn(letter);
      addDecor(oLetter, color);
    }

    const addLetters = (value: any) => {
      value.forEach((char: string, i: number) => {
        if (letters[i] && letters[i].char !== char) {
          letters[i].onScreen.innerHTML = char;
          letters[i].offScreen.innerHTML = char;
          letters[i].char = char;
        }
        if (letters[i] === undefined) {
          addLetter(char, i);
        }
      });
    };

    const animateLetterOut = (letter: any, i: number) => {
      (window as any).TweenLite.to(letter.onScreen, 0.1, {
        scale: 0, opacity: 0, ease: (window as any).Power2.easeIn, onComplete: () => {
          console.log('removing');
          console.log(letter);
          if (!offscreenText){ return; }
          offscreenText.removeChild(letter.offScreen);
          text.removeChild(letter.onScreen);
          positionLetters();
        }
      });
      letters.splice(i, 1);
    }

    const removeLetters = (value: any) => {
      for (let i = letters.length - 1; i >= 0; i--) {
        const letter = letters[i];
        if (value[i] === undefined) {
          animateLetterOut(letter, i)
        }
      }
    }

    const onInputChange = () => {
      const value = this.text === '' ? [] : this.text.toLowerCase().split('');
      addLetters(value);
      removeLetters(value);
      resizeLetters();
    };

    const keyup = (e: KeyboardEvent) => {
      if (runPrompt) {
        this.text = '';
        runPrompt = false;
      }
      ;
      onInputChange();
    }

    const addPrompt = (i: number) => {
      setTimeout(() => {
        if (runPrompt && prompt[i]) {
          this.text = this.text + prompt[i];
          onInputChange();
          addPrompt(i + 1);
        }
      }, 120);
    }

    const svg: any = selectSVG('animatedletters');
    const offscreenText = document.getElementById('offscreen-text');
    const text: any = document.getElementById('text');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let textSize = 0;
    let textCenter = 0;
    const letters: any = [];
    const prompt = this.letters.split("");
    let runPrompt = true;

    addPrompt(0);
  }
}
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Rubik+Mono+One");

.box {
  position: relative;
  height: 200px;
  width: 100%;
  text-align: center;
  font-family: 'Rubik Mono One', sans-serif;

  #animatedletters {
    height: 100%;
    position: absolute;
    width:100%;
    top: 40px;
    left: 0px;
    z-index: 0;
  }

  .text, .offscreen-text {
    width: 100%;
    top: 0;
    display: block;
    position: absolute;
    margin: 0;
    font-size: 32px;
  }

  .offscreen-text {
    text-align: center;
    top: -9999px;
  }

  .text span {
    position: absolute;
  }

}
</style>
