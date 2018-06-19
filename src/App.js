import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Fullpage, Slide, HorizontalSlider } from 'fullpage-react';
const { changeFullpageSlide, changeHorizontalSlide } = Fullpage;
const fullPageOptions = {
  // for mouse/wheel events
  // represents the level of force required to generate a slide change on non-mobile, 0 is default
  scrollSensitivity: 2,

  // for touchStart/touchEnd/mobile scrolling
  // represents the level of force required to generate a slide change on mobile, 0 is default
  touchSensitivity: 2,
  scrollSpeed: 500,
  resetSlides: true,
  hideScrollBars: true,
  enableArrowKeys: true,

  // optional, set the initial vertical slide
  activeSlide: 0
};

const topNavStyle = {
  textAlign: 'center',
  position: 'fixed',
  width: '100%',
  cursor: 'pointer',
  zIndex: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  top: '0px'
};

const horizontalNavStyle = {
  position: 'absolute',
  width: '100%',
  top: '50%',
  zIndex: 10
};

const horizontalSliderProps = {
  name: 'horizontalSlider1',
  infinite: true
};
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0
      }
    };

    this.onSlideChangeStart = this.onSlideChangeStart.bind(this);
    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeStart(name, props, state, newState) {
    if (!this.horizontalNav) {
      this.horizontalNav = document.getElementById('horizontal-nav');
    }

    if (name === 'horizontalSlider1') {
      scrollNavStart(this.horizontalNav);
    }
  }

  onSlideChangeEnd(name, props, state, newState) {
    if (name === 'horizontalSlider1') {
      scrollNavEnd(this.horizontalNav);
    }

    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide
    };

    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  componentDidMount() {

  }

  render() {
    const { active } = this.state;

    const currentActive = active.Fullpage;
    const prevSlide = changeFullpageSlide.bind(null, currentActive - 1);
    const nextSlide = changeFullpageSlide.bind(null, currentActive + 1);
    const goToTop = changeFullpageSlide.bind(null, 0);

    const horizontalSliderName = horizontalSliderProps.name;
    const horizontalActive = this.state.active[horizontalSliderName];

    const prevHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive - 1);
    const nextHorizontalSlide = changeHorizontalSlide.bind(null, horizontalSliderName, horizontalActive + 1);

    const topNav = (
      <div style={topNavStyle}>
        <span onClick={prevSlide}>
          <button>About</button>
        </span>
        <span onClick={nextSlide}>
          <button>Skills</button>
        </span>
        <span onClick={nextSlide}>
          <button>Contact</button>
        </span>
      </div>
    );

    const horizontalNav = (
      <div id='horizontal-nav' style={horizontalNavStyle}>
        <span onClick={prevHorizontalSlide}><button>PREV</button></span>
        <span style={{position: 'absolute', right: '0px'}} onClick={nextHorizontalSlide}><button>Next</button></span>
      </div>
    );

    const horizontalSlides = [
      <Slide style={{backgroundColor: 'grey'}}><p>Horizontal 1</p></Slide>,
      <Slide style={{backgroundColor: 'white'}}><p>Horizontal 2</p></Slide>,
      <Slide style={{backgroundColor: '#7878'}}><p>Horizontal 3</p></Slide>
    ];
    horizontalSliderProps.slides = horizontalSlides;

    const horizontalSlider = <HorizontalSlider id='horizontal-slider-1' {...horizontalSliderProps}>{horizontalNav}</HorizontalSlider>;
    let introWrapper = 'intro-wrapper';
    const verticalSlides = [
      <Slide className={introWrapper}>
        <div class="intro-content">
          <h1>Hi, I'm Archana!</h1>
          <sub>Full Stack Dev | Open-Source Enthusiast | Blogger | Ninja</sub>
        </div>
        <div class="arrow-down bounce" onClick={nextSlide}>

        </div>
      </Slide>,
      horizontalSlider,
      <Slide style={{backgroundColor: 'pink'}}><p>Slide 3</p></Slide>
    ];
fullPageOptions.slides = verticalSlides;
    return (
     <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>
        {topNav}
      </Fullpage>
    );
  }
}

function scrollNavStart(nav) {
  // make the nav fixed when we start scrolling horizontally
  nav.style.position = 'fixed';
}

function scrollNavEnd(nav) {
  // make the nav absolute when scroll finishes
  nav.style.position = 'absolute';
}


export default App;
