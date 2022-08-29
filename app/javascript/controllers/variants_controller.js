import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="variants"
export default class extends Controller {

static targets = [ 
	"parsin",
	"parsout"
]


initialize() {

}

connect() {
	this.parupdate()
}

parupdate(event) {
	let list = []
	this.parsinTargets.forEach( element => list.push(element.value))
	this.parsoutTarget.value = list.join('')
}

}