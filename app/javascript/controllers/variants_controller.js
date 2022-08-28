import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="reporter"
export default class extends Controller {

static targets = [ 
	"parbutton",
	"lengthout",
	"parsout",
	"eighteen"
]

static classes = [
	"invisible"
]

initialize() {
	let default_pars = []
	for(let i = 0; i < 17; i++) {
		default_pars.push('3')
	}
	this.parlist = default_pars.join('')
	this.parsoutTarget.innerText = this.parlist
	this.lengthoutTarget.innerText = 9
	this.eighteenTarget.innerText = "9 Holes"
}

connect() {


}

toggleLength() {
	this.eighteenTarget.classList.toggle("visually-hidden")
	if (this.lengthoutTarget.innerText == 9) {
		this.lengthoutTarget.innerText = 18
		this.eighteenTarget.innerText = "18 Holes"
	} else {
		this.lengthoutTarget.innerText = 9
		this.eighteenTarget.innerText = "9 Holes"
	}
}

setPars() {
	let list = this.parbuttonTargets
	let.pars = []
	list.forEach(element => this.pars.push(element.innerText)
	this.parlist = list.join('')
	this.parsoutTarget.innerText = this.parlist
}

parButton() {
	let old = parseInt(event.currentTarget.innerText)
	if(old < 5)
		event.currentTarget.innerText = old + 1
	else
		event.currentTarget.innerText = 3
}

}