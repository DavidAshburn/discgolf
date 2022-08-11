//Keeps track of round data until we are ready to submit a card at the end

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="composer"
export default class extends Controller {
  static targets = [ 
      
      ]

  initialize() {
    this.string_out = ''
    this.total_score = 0
    this.misses = 0
  }

  connect() { 
  }

  writeDrive() {
    this.total_score++
    this.string_out = 'd'
    this._updateOutput()
  }

  writeMid() {
    this.total_score++
    this.string_out = 'm'
    this._updateOutput()
  }

  writePutt() {
    this.total_score++
    this.string_out = 'p'
    this._updateOutput()
  }

  writeFault() {
    this.total_score++
    this.misses++
    this.string_out = 'f'
    this._updateOutput()
  }

  writeLeft() {
    
    this.string_out = '1'
    this.misses++
    this._updateOutput()
  }

  writeRight() {
    
    this.string_out = '2'
    this.misses++
    this._updateOutput()
  }

  writeStraight() {
    
    this.string_out = '0'
    this._updateOutput()
  }

  _updateOutput(){
    this.outputTarget.innerText = this.string_out
    this.shot_displayTarget.innerText = this.total_score
    this.miss_displayTarget.innerText = this.misses

  }


}
