// slide-animation.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, Observer);

@Component({
  selector: 'app-slide-animation',
  standalone: true,
  templateUrl: './slide-animation.component.html',
  styleUrls: ['./slide-animation.component.scss']
})
export class SlideAnimationComponent implements OnInit, AfterViewInit {
  currentIndex = 0;
  animating = false;
  sections: any;
  images: any;
  outerWrappers: any;
  innerWrappers: any;
  count: any;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeAnimation();
  }

  initializeAnimation(): void {
    // Selecciona elementos como en el código original
    this.sections = gsap.utils.toArray(".slide");
    this.images = gsap.utils.toArray(".image").reverse();
    this.outerWrappers = gsap.utils.toArray(".slide__outer");
    this.innerWrappers = gsap.utils.toArray(".slide__inner");
    this.count = document.querySelector(".count");

    // Ajusta configuraciones iniciales
    gsap.set(this.outerWrappers, { xPercent: 100 });
    gsap.set(this.innerWrappers, { xPercent: -100 });
    gsap.set(".slide:nth-of-type(1) .slide__outer", { xPercent: 0 });
    gsap.set(".slide:nth-of-type(1) .slide__inner", { xPercent: 0 });

    // Configura el observador de scroll y otros eventos
    Observer.create({
      type: "wheel,touch,pointer",
      preventDefault: true,
      wheelSpeed: -1,
      onUp: () => this.gotoSection(this.currentIndex + 1, +1),
      onDown: () => this.gotoSection(this.currentIndex - 1, -1),
      tolerance: 10
    });

    // Listener para las teclas
    document.addEventListener("keydown", this.logKey.bind(this));
  }

  gotoSection(index: number, direction: number): void {
    if (this.animating) return;
    this.animating = true;

    index = gsap.utils.wrap(0, this.sections.length)(index);
    const currentSection = this.sections[this.currentIndex];
    const nextSection = this.sections[index];
    const heading = currentSection.querySelector(".slide__heading");
    const nextHeading = nextSection.querySelector(".slide__heading");

    gsap.set([this.sections, this.images], { zIndex: 0, autoAlpha: 0 });
    gsap.set([this.sections[this.currentIndex], this.images[index]], { zIndex: 1, autoAlpha: 1 });
    gsap.set([this.sections[index], this.images[this.currentIndex]], { zIndex: 2, autoAlpha: 1 });

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "expo.inOut" },
      onComplete: () => { this.animating = false; }
    });

    tl.set(this.count, { text: index + 1 + "" }, 0.32)
      .fromTo(this.outerWrappers[index], { xPercent: 100 * direction }, { xPercent: 0 }, 0)
      .fromTo(this.innerWrappers[index], { xPercent: -100 * direction }, { xPercent: 0 }, 0)
      .to(heading, { "--width": 800, xPercent: 30 * direction }, 0)
      .fromTo(nextHeading, { "--width": 800, xPercent: -30 * direction }, { "--width": 200, xPercent: 0 }, 0)
      .fromTo(this.images[index], { xPercent: 125 * direction, scaleX: 1.5, scaleY: 1.3 }, { xPercent: 0, scaleX: 1, scaleY: 1, duration: 1 }, 0)
      .fromTo(this.images[this.currentIndex], { xPercent: 0, scaleX: 1, scaleY: 1 }, { xPercent: -125 * direction, scaleX: 1.5, scaleY: 1.3 }, 0)
      .fromTo(currentSection.querySelector('.slide__img'), { scale: 2 }, { scale: 1 }, 0)
      .timeScale(0.8);

    this.currentIndex = index;
  }

  logKey(event: KeyboardEvent): void {
    if ((event.code === "ArrowUp" || event.code === "ArrowLeft") && !this.animating) {
      this.gotoSection(this.currentIndex - 1, -1);
    }
    if ((event.code === "ArrowDown" || event.code === "ArrowRight" || event.code === "Space" || event.code === "Enter") && !this.animating) {
      this.gotoSection(this.currentIndex + 1, 1);
    }
  }
}
