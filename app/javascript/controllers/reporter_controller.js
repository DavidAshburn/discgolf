import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="reporter"
export default class extends Controller {
  static targets = [ 
    "holepar",
    "score",
    "length",
    "firsttotal",
    "secondtotal",
    "shotstring",
    "circleoneputt",
    "circleonedata",
    "circleonedata2",
    "circletwoputt",
    "circletwodata",
    "circletwodata2",
    "drivedata",
    "drivedata2",
    "scrambledata",
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
    this.scorelist = [] //setScores()  setStyles()
    this.totalpar = 0 //setPars()
    this.pars = [] //setGreenStats()  setStyles()
    this.shot_array = [] //setScores()
    this.length = 0
  }

  connect() {
    this.length = parseInt(this.lengthTarget.innerText)
    this.setScores()
    this.setPars()
    this.setStyles()
    this.setCircleOneStats()
    this.setCircleTwoStats()
    this.setDriveStats()
    this.setGreenStats()
    this.setScramble()

  }

  setPars() {
    this.holeparTargets.forEach(element => this.pars.push(parseInt(element.innerText)))
  }
  //recreate and fill the card scores on connect()
  setScores() { 
    
    this.shot_array = this.shotstring.split("")
    let hole_score = 0
    let hole_index = 0
    this.shot_array.shift()
    //walk through the shotstring to get our scores per hole
    //there's a special character at shot_array[0] so I check for specific codes
    
    for(let i = 0; i < this.shot_array.length; i++) {
      let char = this.shot_array[i]
      if (char == 'f' || char == 'o' || char == 'c' || char == 't')
        hole_score++
      if (char == 'p')
        hole_score += 2
      if (char == 'b') { //when we hit a basket, log the score and reset let variables
        hole_score++
        this.scorelist[hole_index] = hole_score
        hole_index++
        hole_score = 0
      }
    }

    //set innerText for scores per hole and sum/set the total score
    let scorelist_index = 0
    let first_score_sum = 0
    let second_score_sum = 0


    this.scoreTargets.forEach(box => {
      box.innerText = this.scorelist[scorelist_index]
      if(scorelist_index < 9)
        first_score_sum += this.scorelist[scorelist_index]
      else
        second_score_sum += this.scorelist[scorelist_index]
      scorelist_index++
    });
    this.firsttotalTarget.innerText = first_score_sum
    if(this.length == 18)
      this.secondtotalTarget.innerText = second_score_sum
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
    let c1_drives = this.getCount("bc") //drives into c1
    
    this.drivedataTarget.innerText = `${ penalty_drives.toFixed(0) }`
    this.drivedata2Target.innerText = `${ (c2_drives + c1_drives).toFixed(0) }`

    this.driveaccuracyTarget.innerText = `${ ((1 - (bad_drives / 9))*100).toFixed(0)}%`

  }

  //three indexes in the main loop
  //it walks through the round and keeps track of which circles were hit in regulation
  setGreenStats() {
    //keep track of current hole and current player score, this.shotstring is more useful as an array here
    //hole indexes this.pars so we can check if the player is on the green in regulation
    let hole = 0
    let shot = 0
    let lies = this.shot_array
    let greenone = 0 //counters
    let greentwo = 0 //
    let gircount = 0 //

    //walk through the round
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
    this.greeninregulationTarget.innerText = `${(((gircount)/this.length)*100).toFixed(0)}%`
  }

  //input: the substring for a hole's strokes and the hole index
  //it returns true if the player hit the green in regulation
  greenInReg(chars,hole) {
    let len = chars.length
    for(let i = 1; i <= this.pars[hole] - 2; i++) { //i only goes up to par-2, it only checks shots in regulation
      let shot = chars.charAt(i-1)
      if (shot == 'c' || shot == 't' || shot == 'b') //if you hit the green or basket in regulation return true
        return true
    }
    return false //if there is no green or basket in regulation
  }

  setScramble() {
    //keep track of current hole and current player score, this.shotstring is more useful as an array here
    //hole indexes this.pars so we can check if the player is on the green in regulation
    let hole = 0
    let temp = []
    let scramble_count = 0
    let char = ""

    for(let i = 0; i < this.shot_array.length; i++) { //loop through this.shot_array and pick out substrings for each hole
      char = this.shot_array[i]
      temp.push(char)
      if(char == 'b') {  //we have a hole's substring in temp, so we pass it into greenInReg() with the hole index
        if( !this.greenInReg(temp.join(), hole) ) {
          if(this.scorelist[hole] <= this.pars[hole])
            scramble_count++ // if the green wasn't in regulation but the score was <= par
        }
        hole++ 
        temp = [] //reset loop variables
      }
    }
    this.scrambledataTarget.innerText = `${scramble_count.toFixed(0)}`
  }


  setStyles() {
    
    let difference = 0
    for(let i = 0; i < this.length; i++) {

      difference = this.scorelist[i] - this.pars[i] //check the over/under on each hole
      

      switch(difference) { //assign the appropriate class for styling
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