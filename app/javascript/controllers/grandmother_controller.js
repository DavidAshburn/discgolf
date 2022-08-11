import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="grandmother"
export default class extends Controller {
  static targets = [ 
  "thispar", 
  "thishole", 
  "thisscore",
  "par",
  "score",
  "total",
  "parout",
  "totalpar"
  ]

  initialize() {
    this.thisscore = 0
    this.thishole = 1
    this.thispar = 0
    this.parlist = [0,0,0,0,0,0,0,0,0]
    this.scorelist = [0,0,0,0,0,0,0,0,0]
    this.playerScores
    this.total = 0
    this.totalpar = 0
  }

  connect() {
    console.log("connect");
    

    for(let i = 0; i < 9; i++){
       this.parlist[i] = this.parTargets[i].innerText
       this.paroutTargets[i].innerText = this.parlist[i]
       this.totalpar += parseInt(this.parlist[i])
    }

    this.thispar = this.parlist[this.thishole-1]
    this.totalparTarget.innerText = this.totalpar

    this._updateOutput()
  }

  shotInc() {
    this.thisscore++
    this._updateOutput()
  }

  shotUndo() {
    this.thisscore--
    this._updateOutput()
  }

  holeInc() {
    this.scorelist[this.thishole-1] += this.thisscore
    this.thishole++
    this.thisscore = 0
    this.thispar = this.parlist[this.thishole-1]
    this._updateScores()
    this._updateOutput()
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
    this.thisholeTarget.innerText = this.thishole
    this.thisscoreTarget.innerText = this.thisscore
    this.thisparTarget.innerText = this.thispar
  }
};