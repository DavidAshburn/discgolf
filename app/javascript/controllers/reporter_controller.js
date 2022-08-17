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
    "circleonedata",
    "circleonedata2",
    "circletwoputt",
    "circletwodata",
    "circletwodata2",
    "drivedata",
    "drivedata2",
    "driveaccuracy",
    "greendata",
    "greendata2",
    "greeninregulation"
    ];

  initialize() {
    this.shotstring = this.shotstringTarget.innerText
    this.scorelist = [0,0,0,0,0,0] //scores on each hole - _parseShot()
    this.scoretotal = this.shotstring.length + this.getCount('p') //penalties count for two strokes
    this.totalpar = 0
    this.pars = []
    this.gircount = 0
    this.greenone = 0
    this.greentwo = 0
  }

  connect() {
    this.setScores()
    this.setPars()
    this.setCircleOneStats()
    this.setCircleTwoStats()
    this.setDriveStats()
    this.setGreenStats()
  }

  //calculate and fill the total par on connect()
  setPars() { 
    this.holeparTargets.forEach(hole => {
      this.totalpar += parseInt(hole.innerText)
      this.pars.push(parseInt(hole.innerText))
    })
    this.totalparTarget.innerText = this.totalpar
  }


  //recreate and fill the card scores on connect()
  setScores() { 
    
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


  //helper that counts occurrences of a string within 'this.shotstring'
  //regex seemed like overkill
  getCount(chars) {
    let charlen = chars.length
    let output = 0
    for(let i = 0; i < this.shotstring.length; i++) {
      if (this.shotstring.substr(i,charlen) == chars) {
        output++
        i += charlen - 1
      }
    }
    return output
  }


  setCircleOneStats() {
    let good_circle_one_putts = this.getCount("cb")
    let all_circle_one_putts = this.getCount("c")
    let pen_one_putts = this.getCount("cp")
    let c1_one_putts = this.getCount("cc")

    this.circleonedataTarget.innerText = `${ pen_one_putts.toFixed(0) }`
    this.circleonedata2Target.innerText = `${ c1_one_putts.toFixed(0) }`

    if(all_circle_one_putts > 0)
      this.circleoneputtTarget.innerText = `${((good_circle_one_putts / all_circle_one_putts)*100).toFixed(0)}%`
    else 
      this.circleoneputtTarget.innerText = "None"
  }



  setCircleTwoStats() {
    let good_circle_two_putts = this.getCount("tb")
    let all_circle_two_putts = this.getCount("t")
    let pen_two_putts = this.getCount("tp")
    let c1_two_putts = this.getCount("tc")
    
    this.circletwodataTarget.innerText = `${ pen_two_putts.toFixed(0) }`
    this.circletwodata2Target.innerText = `${ c1_two_putts.toFixed(0) }`

    if(all_circle_two_putts > 0)
      this.circletwoputtTarget.innerText = `${((good_circle_two_putts / all_circle_two_putts)*100).toFixed(0)}%`
    else
      this.circletwoputtTarget.innerText = "None"
  }
  

  setDriveStats() {
    let pen_drives = this.getCount("bp")
    let off_drives = this.getCount("bo")
    let bad_drives = pen_drives + off_drives
    let c2_drives = this.getCount("bt")
    
    this.drivedataTarget.innerText = `${ pen_drives.toFixed(0) }`
    this.drivedata2Target.innerText = `${ c2_drives.toFixed(0) }`

    this.driveaccuracyTarget.innerText = `${ ((1 - (bad_drives / 9))*100).toFixed(0)}%`

  }

  //complicated loop with three indexes
  //it walks through the round and keeps track of which circles were hit in regulation
  setGreenStats() {
    let hole = 0
    let shot = 0
    let lies = this.shotstring.split('')

    for(let i = 0; i < lies.length; i++) {
      shot++
      if( shot + 2 <= this.pars[hole]) {
        if(lies[i] == 'c') {
          this.gircount++
          this.greenone++
          while(lies[i] != 'b')
            i++
        }
        else if(lies[i] == 't') {
          this.gircount++
          this.greentwo++
          while(lies[i] != 'b')
            i++
        }
        else if(lies[i] == 'b') {
          hole++
          this.gircount++
          shot = 0
        }
      }
      if(lies[i] == 'b') {
        hole++
        shot = 0
      }

    }

    this.greendataTarget.innerText = `${this.greenone.toFixed(0)}`
    this.greendata2Target.innerText = `${this.greentwo.toFixed(0)}`
    this.greeninregulationTarget.innerText = `${(((this.gircount)/9)*100).toFixed(0)}%`
  }
}