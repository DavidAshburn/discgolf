import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="reporter"
export default class extends Controller {
  static targets = [ 
    "holepar",
    "totalpar",
    "score",
    "total",
    "shotstring",
    "circleoneputt",
    "circletwoputt",
    "driveaccuracy"
    ];

  initialize() {
    this.shotstring = this.shotstringTarget.innerText
    this.scorelist = [0,0,0,0,0,0] //scores on each hole - _parseShot()
    this.firstShots = [0,0,0,0,0,0] //basket,c1,c2,fairway,off-fairway,penalty - _parseShot()
    this.lastShots = [0,0,0,0,0,0]  //basket,c1,c2,fairway,off-fairway,penalty - _parseShot()
    this.scoretotal = this.shotstring.length
    this.totalpar = 0
  }

  connect() {
    
    this.setScores()
    this.setPars()
    this.parseShot()
    this.setStats()
  }

  setStats() {

    let good_circle_one_putts = /cb/g.exec(this.shotstring)
    let all_circle_one_putts = /c[a-z]/g.exec(this.shotstring)

    let good_circle_two_putts = /tb/g.exec(this.shotstring)
    let all_circle_two_putts = /t[a-z]/g.exec(this.shotstring)

    let bad_drives = /^o|^p|bo|bp/g.exec(this.shotstring)
    if (!bad_drives) {
      let bad_drives = []
    }
    
    this.circleoneputtTarget.innerText = `${(good_circle_one_putts.length / all_circle_one_putts.length).toFixed(2)*100}%`
    this.circletwoputtTarget.innerText = `${(good_circle_two_putts.length / all_circle_two_putts.length).toFixed(2)*100}%`
    this.driveaccuracyTarget.innerText = `${((9 - bad_drives.length) / 9).toFixed(2)*100}%`


  }

  setPars() { //calculate and fill the total par
    this.holeparTargets.forEach(hole => this.totalpar += parseInt(hole.innerText))
    this.totalparTarget.innerText = this.totalpar
  }

  setScores() { //recreate and fill the card scores
    
    this.shot_array = this.shotstring.split("")
    let hole_score = 0
    let hole_index = 0

    for(let i = 0; i < this.shot_array.length; i++) {
      hole_score++
      if (this.shot_array[i] == 'b') { //when we hit a basket, log the score and reset let variables
        this.scorelist[hole_index] = hole_score
        hole_index++
        hole_score = 0
      }
    }

    let scorelist_index = 0
    let score_sum = 0
    this.scoreTargets.forEach(box => {
      box.innerText = this.scorelist[scorelist_index]
      score_sum += this.scorelist[scorelist_index]
      scorelist_index++
    });

    this.totalTarget.innerText = score_sum

  }

  parseShot() { //use the shotstring to create some useful arrays describing the user's round
    let firstShotsExp = /^[b-t]|(?<=b)[b-t]/g
    let drives = firstShotsExp.exec(this.shotstring)
    let lastShotsExp = /[b-t](?=b)/g
    let putts = lastShotsExp.exec(this.shotstring)

    
    
    for(let i = 0; i < drives.length; i++){
      switch (drives[i]) {
      case 'b': //Ace
        this.firstShots[0]++
        break
      case 'c': //Circle One
        this.firstShots[1]++
        break
      case 't': //Circle Two
        this.firstShots[2]++
        break
      case 'f': //Fairway
        this.firstShots[3]++
        break
      case 'o': //Off-Fairway
        this.firstShots[4]++
        break
      case 'p': //Penalty
        this.firstShots[5]++
        break
      default:
        break
      }
    }

    for(let i = 0; i < putts.length; i++){
      switch (putts[i]) {
      case 'b': //Ace
        this.lastShots[0]++
        break
      case 'c': //Circle One
        this.lastShots[1]++
        break
      case 't': //Circle Two
        this.lastShots[2]++
        break
      case 'f': //Fairway
        this.lastShots[3]++
        break
      case 'o': //Off-Fairway
        this.lastShots[4]++
        break
      case 'p': //Penalty
        this.lastShots[5]++
        break
      default:
        break
      }
    }
  }

}
