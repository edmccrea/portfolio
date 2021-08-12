import { gsap } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
import { CSSPlugin, AttrPlugin } from 'gsap/all';

//without this line, CSSPlugin and AttrPlugin may get dropped by your bundler...
const plugins = [CSSPlugin, AttrPlugin];

// Landing Animation
gsap.registerPlugin(CSSRulePlugin);
const border = CSSRulePlugin.getRule('.content:before');
const landingTitle = document.querySelector('.landing-title');
const landingSubtitle = document.querySelector('.landing-subtitle');
const scrollMouse = document.querySelector('.scroll');
const timeline = gsap.timeline();

timeline.from(border, {
  delay: 0.5,
  duration: 4,
  cssRule: { scaleX: 0 },
});

timeline.to(
  landingTitle,
  {
    duration: 2,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    y: '30px',
  },
  '-=1'
);
timeline.to(
  landingSubtitle,
  {
    duration: 1,
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    y: '30px',
  },
  '-=0.5'
);
timeline.from(scrollMouse, {
  y: '-30%',
  opacity: 0,
  duration: 2,
  delay: 1,
});

// Scroll Animations

gsap.registerPlugin(ScrollTrigger);
let transition = gsap.utils.toArray('.transition');

transition.forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: 'center bottom',
    },
    y: 50,
    opacity: 0,
    duration: 1.3,
    stagger: 0.3,
  });
});
