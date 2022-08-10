import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scorecard"
export default class extends Controller {
  static targets = ["output"]

  initialize() {
    this.clickCount = 0;
  }

  connect() {
      this._updateOutput();
  }

  addOne() {
    this.clickCount++;
    this._updateOutput();
  }

  _updateOutput() {
    this.outputTarget.innerText = `You've clicked ${this.clickCount} times`;
  }

};