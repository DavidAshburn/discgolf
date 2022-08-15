import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="grandmother"
export default class extends Controller {
  static targets = [ 
  "thispar", 
  "thishole", 
  "thisscore", // to update labels on screen
  "par", //importing parlist on init. to pardisplay
  "score", //_updateScores scoreboard
  "total", //score total for player
  "pardisplay", 
  "totalpar",  //scoreboard row
  "parlabel", 
  "holelabel",
  "scorelabel", //these three change after inputting 9th hole score
  "scoreout", 
  "shotsout" //tags for hidden card form input
  ]

  initialize() {
    this.thisscore = 0
    this.thishole = 1
    this.thispar = 0
    this.parlist = [0,0,0,0,0,0,0,0,0]
    this.scorelist = [0,0,0,0,0,0,0,0,0]
    this.total = 0
    this.totalpar = 0
    this.shotstring = "test"
  }

  connect() {
    console.log("connect");
    

    for(let i = 0; i < 9; i++){
       this.parlist[i] = this.parTargets[i].innerText
       this.pardisplayTargets[i].innerText = this.parlist[i]
       this.totalpar += parseInt(this.parlist[i])
    }

    this.thispar = this.parlist[this.thishole-1]
    this.totalparTarget.innerText = this.totalpar

    this._updateOutput()
  }

  shotInc() {
    if(this.thishole < 10) {
      this.thisscore++
      this._updateOutput()
    }
  }

  shotUndo() {
    if(this.thishole > 1 && this.thishole < 10) {
      this.thisscore--
      this._updateOutput()
    }
  }

  holeInc() {
    // Hole "10" just has the totals of pars and your scores, next converts to Submit button, back still works
    //we update normally early on
    if(this.thishole < 9){
      this.scorelist[this.thishole-1] = this.thisscore

      this.thishole++
      this.thisscore = this.scorelist[this.thishole-1]
      this.thispar = this.parlist[this.thishole-1]
      
      this._updateScores()
      this._updateOutput()
    }
    else if (this.thishole == 9){ // on the "10th" hole, we update the par and score to be totals for the course, //and prepare hidden fields?//
      this.scorelist[this.thishole-1] = this.thisscore
      this.thishole++

      this._updateScores()

      this.thisscoreTarget.innerText = this.total
      this.thisparTarget.innerText = this.totalpar
      this.thisholeTarget.innerText = "9 Holes"
    }
  }

  holePrevious() {
    if (this.thishole > 1) {
      this.thishole--
      this.thisscore = this.scorelist[this.thishole-1]
      this._updateOutput()
    }
  }

  _updateScores() {
    this.total = 0
    for(let i = 0; i < 9; i++){
      this.scoreTargets[i].innerText = this.scorelist[i]
      this.total += this.scorelist[i]
    }
    this.totalTarget.innerText = this.total
  }


  _updateOutput() {
    this.thisholeTarget.innerText = `Hole: ${this.thishole}`
    this.thisscoreTarget.innerText = this.thisscore
    this.thisparTarget.innerText = this.thispar
  }
};