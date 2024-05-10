import "./SelectPageCss.css"
import "./SelectResponsiveCss.css"
import {Grid} from "@mui/material";
import CardMembership from "../../resources/HomeImage/Card-Membership.svg"
import Event from "../../resources/HomeImage/Event-available.svg"
import HandShake from "../../resources/HomeImage/Handshake.svg"
import Job from "../../resources/HomeImage/Job.svg"
import ManageAccount from "../../resources/HomeImage/Manage-Account.svg"
import MenuBook from "../../resources/HomeImage/Menu-Book.svg"
const SelectPage = () => {
  return (
    <>
      <section className="plan-visit whiteBackground homepageBG2 activeSection">
        <div className="container-fluid">
          <h1 role="none" className="secondaryFont textCenter">What would you like to do today?</h1><br
          className="d-none d-lg-block"/><br className="d-none d-lg-block"/>
          <div className="row flex-column flex-lg-row">
            <div className="col-lg-4 mb-3 mb-lg-0">
              <div className="card planvisitCard width100">

                <div id="planYourVisit" className="card-body justify-content-center textCenter">
                  <div className="planvisitFont textCenter">Plan Your Visit</div>
                  <br/>
                  <h3 role="none">
                    <div id="select-lib-button" className="dropdown w-100">
                      <button
                        className="hero-select dropdown-toggle dropBtn transparentBackground whiteFont borderNone text-wrap px-0">
                        <h4 role="none" id="planVisitDropdown" className="fontWeight500 latoFont"><i aria-hidden="true"
                                                                                                     className="fas fa-map-marker-alt whiteFont"></i>&nbsp;&nbsp;&nbsp;National
                          Library / Lee Kong Chian Reference Library<i aria-hidden="true"
                                                                       className="fas fa-chevron-down whiteFont"></i>
                        </h4></button>
                    </div>
                    <div>
                      <div className="planvisitBorder"></div>
                    </div>
                  </h3>
                  <br className="d-none d-lg-block"/>
                  <div id="LKCRL" className="planVisitLibraryInfo">
                    <div className="openingHours whiteBorder textCenter marginAuto radius10 padding10"><h3 role="none"
                                                                                                           className="marginbottom16 whiteFont fontWeight500 latoFont">Open
                      today from</h3> <h3 role="none" className="marginbottom8 whiteFont latoFont">10:00 AM <span
                      className="fontWeight500">to</span> 09:00 PM</h3></div>
                    <br className="d-none d-lg-block"/> <h5 role="none"
                                                            className="marginbottom8 whiteFont fontWeight500 latoFont col-8 px-4 d-none d-lg-block mx-auto"></h5>
                    <br className="d-none d-lg-block"/>
                    <div className="textCenter"><a
                      href="/main/visit-us/our-libraries-and-locations/libraries/national-library-singapore">
                      <button type="submit" className="buttonLibrary">Go to the library&nbsp;&nbsp;&nbsp;<i
                        aria-hidden="true" className="fas fa-chevron-right secondaryFont"></i></button>
                    </a></div>
                  </div>
                </div>
                <br/>
              </div>
            </div>
            <div className="buttons-container col-lg-7 col-xl-8">

              <div className="row">
                <Grid container xs={12} sx={{padding:3}}>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img
                          src={CardMembership}
                          className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">NLB Membership</div>
                    </button>
                  </Grid>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={MenuBook}
                             className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">NLB's Digital Resources</div>
                    </button>
                  </Grid>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={ManageAccount}
                             className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">Loans and Reservations</div>
                    </button>
                  </Grid>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={Event}
                             className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">Book a Room or Venue</div>
                    </button>
                  </Grid>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={Job}
                             className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">Explore a Career with Us</div>
                    </button>
                  </Grid>
                  <Grid xs={4}>
                    <button className="buttonParallelogram secondaryBorder">
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={HandShake}
                             className="card-img rounded-0" alt="..."/>
                      </div>
                      <div className="fontLibrary">Partner Us</div>
                    </button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default SelectPage