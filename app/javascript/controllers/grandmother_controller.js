import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="grandmother"
export default class extends Controller {
  static targets = [ 
  "thispar", 
  "thishole", 
  "thisscore",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "scoreOne",
  "scoreTwo",
  "scoreThree",
  "scoreFour",
  "scoreFive",
  "scoreSix",
  "scoreSeven",
  "scoreEight",
  "scoreNine"
  ]

  initialize() {
    this.thisscore = 0
    this.thishole = 1
    this.thispar = 0
    this.parlist = [0,0,0,0,0,0,0,0,0]

    this.parlist[0] = this.oneTarget.innerText
    this.parlist[1] = this.twoTarget.innerText
    this.parlist[2] = this.threeTarget.innerText
    this.parlist[3] = this.fourTarget.innerText
    this.parlist[4] = this.fiveTarget.innerText
    this.parlist[5] = this.sixTarget.innerText
    this.parlist[6] = this.sevenTarget.innerText
    this.parlist[7] = this.eightTarget.innerText
    this.parlist[8] = this.nineTarget.innerText

    this.total_score = 0
    this.scorelist = [0,0,0,0,0,0,0,0,0]

  }

  connect() {
    console.log("connect");
    this.thispar = this.parlist[this.thishole-1]
    this._updateOutput()
  }

  shotInc() {
    this.thisscore++
    this.total_score++
    this._updateOutput()
  }

  shotUndo() {
    this.thisscore--
    this.total_score--
    this._updateOutput()
  }

  holeInc() {
    this.scorelist[this.thishole-1] += this.thisscore
    this.thishole++
    this.thisscore = 0
    this.thispar = this.parlist[this.thishole-1]
    this._updateScores()
    if(thishole < 10) {
      this._updateOutput()
    }
  }

  _updateScores() {

  this.scoreOneTarget.innerText = this.scorelist[]
  this.scoreTwoTarget.innerText = this.scorelist[]
  this.scoreThreeTarget.innerText = this.scorelist[]
  this.scoreFourTarget.innerText = this.scorelist[]
  this.scoreFiveTarget.innerText = this.scorelist[]
  this.scoreSixTarget.innerText = this.scorelist[]
  this.scoreSevenTarget.innerText = this.scorelist[]
  this.scoreEightTarget.innerText = this.scorelist[]
  this.scoreNineTarget.innerText = this.scorelist[]

  }


  _updateOutput() {
    this.thisholeTarget.innerText = this.thishole
    this.thisscoreTarget.innerText = this.thisscore
    this.thisparTarget.innerText = this.thispar
    this.totalTarget.innerText = this.total_score
  }
};