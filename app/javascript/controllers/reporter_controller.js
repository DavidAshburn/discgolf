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
    this.shotstring = this.shotstringTarget.innerText
    this.scorelist = [0,0,0,0,0,0,0,0,0] //setScores()  setStyles()
    this.totalpar = 0 //setPars()
    this.pars = [] //setPars()  setGreenStats()  setStyles()
    this.shot_array = [] //setScores()
  }

  connect() {
    this.setScores()
    this.setPars()
    this.setStyles()
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

    //walk through the shotstring to get our scores per hole
    for(let i = 0; i < this.shot_array.length; i++) {
      hole_score++
      if (this.shot_array[i] == 'b') { //when we hit a basket, log the score and reset let variables
        this.scorelist[hole_index] = hole_score
        hole_index++
        hole_score = 0
      }
    }

    //set innerText for scores per hole and sum/set the total score
    let scorelist_index = 0
    let score_sum = 0
    this.scoreTargets.forEach(box => {
      box.innerText = this.scorelist[scorelist_index]
      score_sum += this.scorelist[scorelist_index]
      scorelist_index++
    });
    this.totalTarget.innerText = score_sum + this.getCount("p") //penalties count for two strokes
  }


  //helper that counts occurrences of a string within 'this.shotstring'
  //regex.exec(shotstring) only gave me the first occurence even with /~~~/g tag
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

  //this.shotstring char codes => f = fairway | o = off-fairway | c = circle one | t = circle two | p = penalty | b = basket

  setCircleOneStats() {
    let basket_circle_one_putts = this.getCount("cb")
    let all_circle_one_putts = this.getCount("c")
    let penalty_one_putts = this.getCount("cp")
    let c1_one_putts = this.getCount("cc") //putts into c1 from c1

    this.circleonedataTarget.innerText = `${ penalty_one_putts.toFixed(0) }`
    this.circleonedata2Target.innerText = `${ c1_one_putts.toFixed(0) }`

    if(all_circle_one_putts > 0)
      this.circleoneputtTarget.innerText = `${((basket_circle_one_putts / all_circle_one_putts)*100).toFixed(0)}%`
    else 
      this.circleoneputtTarget.innerText = "None"
  }



  setCircleTwoStats() {
    let basket_circle_two_putts = this.getCount("tb")
    let all_circle_two_putts = this.getCount("t")
    let penalty_two_putts = this.getCount("tp")
    let c1_two_putts = this.getCount("tc") //putts into c1 from c2
    
    this.circletwodataTarget.innerText = `${ penalty_two_putts.toFixed(0) }`
    this.circletwodata2Target.innerText = `${ c1_two_putts.toFixed(0) }`

    if(all_circle_two_putts > 0)
      this.circletwoputtTarget.innerText = `${((basket_circle_two_putts / all_circle_two_putts)*100).toFixed(0)}%`
    else
      this.circletwoputtTarget.innerText = "None"
  }
  

  setDriveStats() {
    let penalty_drives = this.getCount("bp") //drives into a penalty
    let off_drives = this.getCount("bo") //drives off-fairway
    let bad_drives = penalty_drives + off_drives
    let c2_drives = this.getCount("bt") //drives into c2
    
    this.drivedataTarget.innerText = `${ penalty_drives.toFixed(0) }`
    this.drivedata2Target.innerText = `${ c2_drives.toFixed(0) }`

    this.driveaccuracyTarget.innerText = `${ ((1 - (bad_drives / 9))*100).toFixed(0)}%`

  }

  //three indexes in the main loop
  //it walks through the round and keeps track of which circles were hit in regulation
  setGreenStats() {
    //keep track of current hole and current player score, this.shotstring is more useful as an array here
    //hole indexes this.pars so we can check if the player is on the green in regulation
    let hole = 0
    let shot = 0
    let lies = this.shotstring.split('')
    let greenone = 0 //counters
    let greentwo = 0 //
    let gircount = 0 //

    //walk through the round again
    for(let i = 0; i < lies.length; i++) {
      shot++
      //if we are in regulation (two shots left to make par)
      if( shot + 2 <= this.pars[hole]) {
        if(lies[i] == 'c') {
          gircount++
          greenone++
          while(lies[i] != 'b') //go to end of this hole
            i++
        }
        else if(lies[i] == 't') {
          gircount++
          greentwo++
          while(lies[i] != 'b') //go to end of this hole
            i++
        }
        else if(lies[i] == 'b') {
          hole++
          gircount++
          shot = 0 //reset hole score at end of hole
        }
      }
      if(lies[i] == 'b') {
        hole++
        shot = 0 //reset hole score at end of hole
      }

    }

    this.greendataTarget.innerText = `${greenone.toFixed(0)}`
    this.greendata2Target.innerText = `${greentwo.toFixed(0)}`
    this.greeninregulationTarget.innerText = `${(((gircount)/9)*100).toFixed(0)}%`
  }


  setStyles() {
    
    let difference = 0
    for(let i = 0; i < 9; i++) {

      difference = this.scorelist[i] - this.pars[i]

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

/*
    "albatross",
    "eagle",
    "birdie",
    "par",
    "bogey",
    "doubleBogey",
    "tripleBogey"

    this.shotstring = this.shotstringTarget.innerText
    this.scorelist = [0,0,0,0,0,0,0,0,0] //setScores()  setStyles()
    this.totalpar = 0 //setPars()
    this.pars = [] //setPars()  setGreenStats()  setStyles()
    this.shot_array = [] //setScores()  setStyles()
*/