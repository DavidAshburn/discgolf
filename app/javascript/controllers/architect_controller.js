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
    this._updateOutput()
  }

  connect() {

  }

  incrementShot({ detail: {content} }) {
    this.shots++
    this._updateOutput()
  }

  incrementMiss({ detail: {content} }) {
    this.misses++
    this._updateOutput()
  }

  _updateOutput() {
  }


}
