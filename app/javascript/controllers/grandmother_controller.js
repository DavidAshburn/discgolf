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

  static classes = [
    "albatross",
    "eagle",
    "birdie",
    "par",
    "bogey",
    "double",
    "triple"
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
    this._updateScores()
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

  // just adds 1 to thisscore and updates output
  shotInc() {
    this.thisscore++
    this._updateOutput()
  }

  // reduces score and slices last entry off of shotstring
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

  /* holeInc()
    during the round: put thisscore to scorelist 
                        increment thishole 
                        pull thisscore from next on scorelist
                        pul thispar from next on scorelist

                        update scores and output
     end of the round: put thisscore to scorelist
                        increment thishole to make holeInc() safe
                        update scores
                        update output to game-end version
  */                  

  holeInc() {
    if(this.shotstring.charAt(this.shotstring.length-1) == 'b'){
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
        //this.shotsoutTarget.innerText = this.shotstring
      }
      this.setStyles()
    }
  }

  //all of these just put the correct character onto shotstring
  writeBasket() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('b')
      this.holeInc() //send to the next hole automatically to prevent bad input
    }
  }

  writeCircleOne() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('c')
    }
  }

  writeCircleTwo() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('t')
    }
  }

  writeFairway() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('f')
    }
  }

  writeOffFairway() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('o')
    }
  }

  //accounting for the extra penalty stroke here
  writePenalty() {
    if(this.thishole < 10){
      this.shotInc()
      this.shotstring = this.shotstring.concat('p')
      this.thisscore++
    }
  }

  //goes back one hole but this will mess up the shotlist with the current implementation
  holePrevious() {
    if (this.thishole < 10) {
      this.thishole--

      //erase the current hole, and the basket from the previous hole
      let last_basket = 0
      let shot_array = this.shotstring.split("")
      shot_array.shift()
      for(let i = shot_array.length - 1; shot_array[i] != 'b'; i--) {
        shot_array.pop()
      }
      shot_array.pop()
      this.shotstring = shot_array.join('')

      this.thisscore = this.scorelist[this.thishole-1]
      this._updateScores()
      this._updateOutput()
      this.thisscore--
      this._updateOutput()
    }
  }

  //update shots on scoreboard and total
  _updateScores() {
    this.total = 0
    for(let i = 0; i < 9; i++){
      this.scoreTargets[i].innerText = this.scorelist[i]
      this.total += this.scorelist[i]
    }
    this.totalTarget.innerText = this.total
    this.shotsoutTarget.innerText = this.shotstring
  }


  _updateOutput() {
    this.thisholeTarget.innerText = `Hole: ${this.thishole}`
    this.thisscoreTarget.innerText = `Score: ${this.thisscore}`
    this.thisparTarget.innerText = `Par: ${this.thispar}`
  }

  setStyles() {
    
    let difference = 0
    for(let i = 0; i < 9; i++) {

      difference = this.scorelist[i] - this.parlist[i]
      if(this.scorelist[i] > 0) {
        switch(difference) {
          case -3:
            this.scoreTargets[i].classList.add(this.albatrossClass)
            break
          case -2:
             this.scoreTargets[i].classList.add(this.eagleClass)
            break
          case -1:
             this.scoreTargets[i].classList.add(this.birdieClass)
            break
          case 0:
             this.scoreTargets[i].classList.add(this.parClass)
            break
          case 1:
             this.scoreTargets[i].classList.add(this.bogeyClass)
            break
          case 2:
             this.scoreTargets[i].classList.add(this.doubleClass)
            break
          case 3:
             this.scoreTargets[i].classList.add(this.tripleClass)
            break
          default:
            break
        }
      }
    }
  }
};