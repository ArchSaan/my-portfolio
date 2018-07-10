import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Fullpage, Slide } from 'fullpage-react';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import { SocialIcon } from 'react-social-icons';


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

const styles = {
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {
        Fullpage: 0,
        horizontalSlider1: 0,
      }
    };

    this.onSlideChangeEnd = this.onSlideChangeEnd.bind(this);
  }

  onSlideChangeEnd(name, props, state, newState) {

    const oldActive = this.state.active;
    const sliderState = {
      [name]: newState.activeSlide,
      
    };

    const updatedState = Object.assign(oldActive, sliderState);
    this.setState(updatedState);
  }

  componentDidMount() {

  }

  render() {
    const { active } = this.state;
    const currentActive = active.Fullpage;
    const nextSlide = changeFullpageSlide.bind(null, currentActive + 1);
    const goToTop = changeFullpageSlide.bind(null, 0);
    
    let introWrapper = 'intro-wrapper';
    let contactWrapper = 'contact-wrapper';
    let showNextArrow ;
    if (currentActive < 1) {
      showNextArrow = (
        <div class="arrow-down down bounce" onClick={nextSlide}>
        </div>
      )
    } 
    else{

      showNextArrow = (
        <div class="arrow-down top bounce" onClick={goToTop}>
        </div>
      )
    }
    const verticalSlides = [
      <Slide id="about" className={introWrapper}>
        <div class="intro-content">
          <h2>Hi, I'm Archana!</h2>
          <sub>Full Stack Dev | Open-Source Enthusiast</sub><br></br>
            <sub><SocialIcon url="https://www.linkedin.com/in/archana-rajan-574071117/" />
                <SocialIcon url="https://github.com/ArchSaan"  />
                <SocialIcon url="https://plus.google.com/u/0/115742798827454403283"  />  
            </sub>
        </div>
        {showNextArrow}
      </Slide>,
      <Slide>
        <div className='app-outer'>
          <div className='app-inner'>
            
            <TagCloud 
              className='tag-cloud'
              style={{
                fontFamily: 'sans-serif',
                //fontSize: () => Math.round(Math.random() * 50) + 16,
                fontSize: 30,
                color: () => randomColor({
                  hue: 'blue'
                }),
                padding: 5,
              }}>
              <div style={styles.large}>CSS3</div>
              <div style={styles.large}>PHP</div>
              <div style={styles.large}>MYSQL</div>
              <div style={styles.large}>React JS</div>
              <div style={styles.large}>D3 JS</div>
              <div style={styles.large}>Data Visualization</div>
              <div style={styles.large}>Responsive Design</div>
              <div style={{fontFamily: 'courier'}}>Angular JS</div>
              <div style={{fontSize: 30}}>Cordova</div>
              <div style={{fontStyle: 'italic'}}>Ionic</div>
              <div style={{fontWeight: 200}}>Javascript</div>
              <div style={{color: 'green'}}>Laravel</div>
              <div>Bootstrap</div>
              <div>Apache</div>
              <div>Jquery</div>
              <div>MVC</div>
              <div>Neo4J</div>
              <div>Git</div>
              <div>Agile Methodology</div>
              <div>Wordpress</div>
              <div>Joomala</div>
              <div>Android</div>
              <div>PLSQL</div>
              <div>Oracle</div>
            </TagCloud>
          </div>
      </div>

      </Slide>,
      
    ];
fullPageOptions.slides = verticalSlides;
    return (
    <div>
     <Fullpage onSlideChangeStart={this.onSlideChangeStart} onSlideChangeEnd={this.onSlideChangeEnd} {...fullPageOptions}>
      </Fullpage>
     </div> 
    );
  }
}

export default App;
