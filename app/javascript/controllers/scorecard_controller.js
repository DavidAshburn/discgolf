import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scorecard"
export default class extends Controller {
  static targets = ["shots"]
  static values = {
    number: Number

  }

  initialize() {
  }

  connect() {
      this._updateOutput();
  }

  addOne() {
    this.numberValue++;
    this._updateOutput();
  }

  _updateOutput() {
    this.outputTarget.textContent = this.numberValue
  }

};