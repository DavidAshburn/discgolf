import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="player"
export default class extends Controller {
  static targets = ["hole", "par"]

  
  initialize() {
    this.teebox = 0
    this.thisPar = 2
  }

  connect() {
    console.log("connected player")
    this._updateAll()
  }

  increment() {
    this.teebox++
    this.thisPar++
    this._updateAll()
  }


  connect() {
    console.log("connected Player")
  }

  _updateAll() {
    this.holeTarget.innerText = this.teebox
    this.parTarget.innerText = this.thisPar 
  }
};
