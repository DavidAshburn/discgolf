//Responsible for toggling styles for shot selection in the center,keeps track of misses as well as finishing a hole

import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="architect"
export default class extends Controller {
  static targets = [ 
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine"
    ]

  initialize() {
    this.shots = 0
    this.misses = 0
    this.this_hole = 1
  }

  connect() {
    this._updateOutput()
  }

  incrementFour() {
    
  }

  incrementShot() {
    this.shots++
    this._updateOutput()
  }

  incrementMiss() {
    this.misses++
    this._updateOutput()
  }

};
