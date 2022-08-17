import { Controller } from "@hotwired/stimulus"


// Connects to data-controller="grandmother"
export default class extends Controller {
  static targets = [ 
  "thispar", 
  "thishole", 
  "thisscore", // all 3 update labels on screen
  "par", //importing parlist on init. to pardisplay
  "score", //_updateScores scoreboard
  "total", //score total for player
  "pardisplay",  //scoreboard row
  "totalpar",  //scoreboard row
  "scoreout", //hidden form
  "shotsout" //hidden form
  ]

  initialize() {
    this.thisscore = 0
    this.thishole = 1
    this.thispar = 0
    this.parlist = [0,0,0,0,0,0,0,0,0]
    this.scorelist = [0,0,0,0,0,0,0,0,0]
    this.total = 0
    this.totalpar = 0
    this.shotstring = ""
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
      //have to undo penalties correctly
      if (this.shotstring.substr(-1,1) == 'p')
        this.thisscore--
      this.shotstring = this.shotstring.slice(0,-1)
      this._updateOutput()
    }
  }

  holeInc() {
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

      this.thisscoreTarget.innerText = `Score: ${this.total}`
      this.thisparTarget.innerText = `Par: ${this.totalpar}`
      this.thisholeTarget.innerText = "9 Holes"

      this.scoreoutTarget.innerHTML = this.total
      this.shotsoutTarget.innerText = this.shotstring
    }
  }

  writeBasket() {
    this.shotstring = this.shotstring.concat('b')
  }

  writeCircleOne() {
    this.shotstring = this.shotstring.concat('c')
  }

  writeCircleTwo() {
    this.shotstring = this.shotstring.concat('t')
  }

  writeFairway() {
    this.shotstring = this.shotstring.concat('f')
  }

  writeOffFairway() {
    this.shotstring = this.shotstring.concat('o')
  }

  //accounting for the extra penalty stroke here
  writePenalty() {
    this.shotstring = this.shotstring.concat('p')
    this.thisscore++
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
    this.thisscoreTarget.innerText = `Score: ${this.thisscore}`
    this.thisparTarget.innerText = `Par: ${this.thispar}`
  }
};