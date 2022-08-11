import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="grandmother"
export default class extends Controller {
  static targets = [ "this-par", "par_list", "this_hole", "this_score" ]

  initialize() {
    this.score = 0
    this.par = 0
    this.hole = 0
    this.pars = []
  }

  connect() {
    console.log("connect");
    this.pars = document.querySelectorAll('.par_list')
    this.parvalues = []
    for (let i = 0; i < pars.length; i++){
      this.parvalues.push(pars[i].innerText)
    }
    _updateOutput()
  }

  printPar() {
    
    _updateOutput()
  }

  shotInc() {
    this.shots++
    _updateOutput()
  }

  missInc() {
    this.misses++
    _updateOutput()
  }

  _updateOutput() {
    this.this_parTarget.innerText = this.parvalues[this.hole - 1]
    this.this_holeTarget.innerText = this.hole
    this.this_scoreTarget.innerText = this.score
  }
};