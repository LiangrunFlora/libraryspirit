import HomeBackground from '../../resources/HomeImage/HomeBackground.png'
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const FirstShowPage = () => {
  return (
    <>
      <section id="explormoresection" className="hero homepageBG1"
               style={{backgroundImage: `url(${HomeBackground})`, padding: 3}}>
        <div className="container-fluid">
          <div className="row">
            <div id="interestSearch" className="col-lg-5 interestGap">
              <div className="interest">
                <br/>
                <div className="container px-0">
                  <h4 role="none">
                    <span style={{ color: 'rgb(237, 239, 246)' ,padding:3}}>Good Morning</span>
                  </h4>
                  <br/>
                  <div className="dropdown">
                    <h1 role="none" style={{color: '#c3c0d3'}}>
                      Welcome to<br/>
                      <button id="dropdownExploreMore"
                              className="hero-select dropdown-toggle dropBtn sectionTitle"
                              style={{color: '#102C57'}}
                      >Library Spirit
                        <i aria-hidden="true" className="fas fa-chevron-down">
                        </i></button>
                    </h1>
                  </div>
                </div>
                <br/>
                <br/>
                <div><h5 role="none">Access Collections:</h5> <h5 role="none"
                                                                  className="d-flex flex-row flex-wrap mb-4"><span
                  className="accessCollection me-2 pb-2 pb-lg-0 mb-1"><u><a
                  href="https://www.nas.gov.sg/archivesonline/" target="_blank" rel="noopener noreferrer">Archives Online</a></u></span>
                  <span className="accessCollection me-2 pb-2 pb-lg-0 mb-1"><u><a href="/main/nlonline" target="_self"
                                                                                  rel="">National Library Online</a></u></span>
                  <span className="accessCollection me-2 pb-2 pb-lg-0 mb-1"><u><a
                    href="https://eresources.nlb.gov.sg/main/sphnewspapers" target="_blank" rel="noopener noreferrer">SPH Media Newspapers</a></u></span>
                </h5><br/>
                </div>
                <div>
                  <div className="row">
                    <div className="col-4 col-md-3 col-xs-1"></div>
                    <div className="col-8 col-md-9 col-xs-11">
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="col-lg-7 carouselStory paddingLeft0 paddingRight0">*/}
            {/*  <div className="nlbHighlight disabledFont fontWeight500"><span></span>NLB Highlights<span></span></div>*/}
            {/*  <div className="slider-container explore-more-slider" id="explore-more-slider">*/}
            {/*    <div className="tns-outer" id="tns1-ow">*/}
            {/*      <div className="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span*/}
            {/*        className="current">3</span> of 4*/}
            {/*      </div>*/}
            {/*      <div id="tns1-mw" className="tns-ovh">*/}
            {/*        <div className="tns-inner" id="tns1-iw">*/}
            {/*          <div className="slider  tns-slider tns-carousel tns-subpixel tns-calc tns-horizontal" id="tns1"*/}
            {/*               style={{transform: 'translate3d(-50%, 0px, 0px)'}}>*/}
            {/*            <div className="slider__item tns-item" id="tns1-item0" aria-hidden="true" tabIndex={-1}>*/}
            {/*              <div className="borderCarousel"></div>*/}


            {/*              <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                 aria-label="Singapore Architecture Collection Exhibitions" rel="noopener noreferrer">*/}
            {/*                <div className="sliderImgContainer">*/}
            {/*                  <img*/}
            {/*                    data-src="https://64.media.tumblr.com/5d58c4f6d767c60acbd0aa78b84ef88f/360632c82017ab65-33/s640x960/720be38a92a7730008bac6b12e2066b218431492.png"*/}
            {/*                    alt="carousel" className="cardimg landscape loaded tns-complete"*/}
            {/*                    src="https://64.media.tumblr.com/5d58c4f6d767c60acbd0aa78b84ef88f/360632c82017ab65-33/s640x960/720be38a92a7730008bac6b12e2066b218431492.png"/>*/}
            {/*                </div>*/}
            {/*              </a>*/}
            {/*              <div className="storyTitle overflow-hidden">*/}
            {/*                <div className="titleText">*/}
            {/*                  <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Singapore Architecture Collection Exhibitions"*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Singapore Architecture Collection Exhibitions*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*              <div className="storyTitle2">*/}
            {/*                <div className="storyDesc">*/}
            {/*                  <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Singapore Architecture Collection Exhibitions"*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Visit the inaugural showcases of the collection at URA Centre and National Library*/}
            {/*                  Building*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="slider__item tns-item" id="tns1-item1" aria-hidden="true" tabIndex={-1}>*/}
            {/*              <div className="borderCarousel"></div>*/}


            {/*              <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                 aria-label="Singapore Architecture Collection Exhibitions" rel="noopener noreferrer">*/}
            {/*                <div className="sliderImgContainer">*/}
            {/*                  <img*/}
            {/*                    data-src="https://64.media.tumblr.com/5d58c4f6d767c60acbd0aa78b84ef88f/c9c68e7340328f0b-e0/s640x960/4842ee7dfc180d6f3e7694efb828f14e74d9a9e6.png"*/}
            {/*                    alt="carousel" className="cardimg landscape loaded tns-complete"*/}
            {/*                    src="https://64.media.tumblr.com/5d58c4f6d767c60acbd0aa78b84ef88f/c9c68e7340328f0b-e0/s640x960/4842ee7dfc180d6f3e7694efb828f14e74d9a9e6.png"/>*/}
            {/*                </div>*/}
            {/*              </a>*/}
            {/*              <div className="storyTitle overflow-hidden">*/}
            {/*                <div className="titleText">*/}
            {/*                  <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Singapore Architecture Collection Exhibitions"*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Singapore Architecture Collection Exhibitions*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*              <div className="storyTitle2">*/}
            {/*                <div className="storyDesc">*/}
            {/*                  <a href="http://www.go.gov.sg/sacexhibitions" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Singapore Architecture Collection Exhibitions"*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Visit the inaugural showcases of the collection at URA Centre and National Library*/}
            {/*                  Building*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="slider__item tns-item tns-slide-active" id="tns1-item2">*/}
            {/*              <div className="borderCarousel"></div>*/}


            {/*              <div className="sliderImgContainer">*/}
            {/*                <img*/}
            {/*                  data-src="https://64.media.tumblr.com/467e05220eaa8553aa7e26ef599e1eb1/5043cb5c5327000e-86/s640x960/70e0a1329e12f79fe33eac61b477c13e58784ae5.jpg"*/}
            {/*                  alt="carousel" className="cardimg landscape loaded tns-complete"*/}
            {/*                  src="https://64.media.tumblr.com/467e05220eaa8553aa7e26ef599e1eb1/5043cb5c5327000e-86/s640x960/70e0a1329e12f79fe33eac61b477c13e58784ae5.jpg"/>*/}
            {/*              </div>*/}
            {/*              <div className="storyTitle overflow-hidden">*/}
            {/*                <div className="titleText">*/}
            {/*                  From 6 April, explore StoryGen at the Punggol Regional Library!*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*              <div className="storyTitle2">*/}
            {/*                <div className="storyDesc">*/}
            {/*                  Put your own twists to well-loved stories and visualise them through a multimedia*/}
            {/*                  experience.*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
            {/*            <div className="slider__item tns-item" id="tns1-item3" aria-hidden="true" tabIndex={-1}>*/}
            {/*              <div className="borderCarousel"></div>*/}


            {/*              <a href="https://go.gov.sg/nlbsgchatbook" className="stretched-link" target="_blank"*/}
            {/*                 aria-label="Register your interest to test ChatBook, our new tech prototype."*/}
            {/*                 rel="noopener noreferrer">*/}
            {/*                <div className="sliderImgContainer">*/}
            {/*                  <img*/}
            {/*                    data-src="https://64.media.tumblr.com/7eb9f0a5998868fe039736c4274aaf9e/057947bf564df456-34/s640x960/57f65a7d719757e2430cba89c3d7c3ac0f26d28e.jpg"*/}
            {/*                    alt="carousel" className="cardimg landscape loaded tns-complete"*/}
            {/*                    src="https://64.media.tumblr.com/7eb9f0a5998868fe039736c4274aaf9e/057947bf564df456-34/s640x960/57f65a7d719757e2430cba89c3d7c3ac0f26d28e.jpg"/>*/}
            {/*                </div>*/}
            {/*              </a>*/}
            {/*              <div className="storyTitle overflow-hidden">*/}
            {/*                <div className="titleText">*/}
            {/*                  <a href="https://go.gov.sg/nlbsgchatbook" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Register your interest to test ChatBook, our new tech prototype."*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Register your interest to test ChatBook, our new tech prototype.*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*              <div className="storyTitle2">*/}
            {/*                <div className="storyDesc">*/}
            {/*                  <a href="https://go.gov.sg/nlbsgchatbook" className="stretched-link" target="_blank"*/}
            {/*                     aria-label="Register your interest to test ChatBook, our new tech prototype."*/}
            {/*                     rel="noopener noreferrer"></a>*/}
            {/*                  Converse with the book “Seven Hundred Years: A History of Singapore” and selected NLB*/}
            {/*                  resourc...*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*            </div>*/}


            {/*          </div>*/}
            {/*        </div>*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <div className="arrows carousel-ctrls">*/}
            {/*      <a role="button" data-slide="prev" id="xpMorePrev" className="arrows__item arrows__item_prew"*/}
            {/*         aria-label="Previous" aria-controls="tns1" tabIndex={-1} data-controls="prev"><i aria-hidden="true"*/}
            {/*                                                                                          className="fas fa-chevron-down ms-0"></i></a>*/}
            {/*      <a role="button" data-slide="next" id="xpMoreNext" className="arrows__item arrows__item_next"*/}
            {/*         aria-label="Next" aria-controls="tns1" tabIndex={-1} data-controls="next"><i aria-hidden="true"*/}
            {/*                                                                                      className="fas fa-chevron-down ms-0"></i></a>*/}
            {/*    </div>*/}
            {/*    <div className="count-slides"><span id="slideCounter">3</span><span>/</span><span>4</span></div>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </div>
      </section>
    </>
  )
}
export default FirstShowPage