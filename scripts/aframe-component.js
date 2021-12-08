// change camera based on mode
AFRAME.registerComponent('change-cam-mode', {
    init: function() {
        var el = this.el
        el.addEventListener('enter-vr', function() {
            console.log("ENTERED VR")
            document.querySelector("#cam-mouse").enabled = false
            document.querySelector("#cam-vr").enabled = true
            document.querySelector("#rhand").enabled = true
            document.querySelector("#lhand").enabled = true
        })
        el.addEventListener('exit-vr', function() {
            console.log("EXITED VR")
            document.querySelector("#cam-mouse").enabled = true
            document.querySelector("#cam-vr").enabled = false
            document.querySelector("#rhand").enabled = false
            document.querySelector("#lhand").enabled = false
        })
    }
})

// controller phase shift
AFRAME.registerComponent('phase-shift', {
    init: function () {
        var el = this.el
        el.addEventListener('gripdown', function () {
        el.setAttribute('collision-filter', {collisionForces: true})
        })
        el.addEventListener('gripup', function () {
        el.setAttribute('collision-filter', {collisionForces: false})
        })
    }
})

// forward mouse and touch events to the super-hands entity
AFRAME.registerComponent('capture-mouse', {
init: function () {
    this.eventRepeater = this.eventRepeater.bind(this)
    this.el.sceneEl.addEventListener('loaded', () => {
    this.el.sceneEl.canvas.addEventListener('mousedown', this.eventRepeater)
    this.el.sceneEl.canvas.addEventListener('mouseup', this.eventRepeater)
    this.el.sceneEl.canvas.addEventListener('touchstart', this.eventRepeater)
    this.el.sceneEl.canvas.addEventListener('touchmove', this.eventRepeater)
    this.el.sceneEl.canvas.addEventListener('touchend', this.eventRepeater)
    }, {once: true})
},
eventRepeater: function (evt) {
    if (evt.type.startsWith('touch')) {
    evt.preventDefault()
    // avoid repeating touchmove because it interferes with look-controls
    if (evt.type === 'touchmove') { return }
    }
    this.el.emit(evt.type, evt.detail)
}
})

// pin and ball collision sound effect
AFRAME.registerComponent('bowling-sfx', {
    init: function() {
        let el = this.el
        el.addEventListener('collide', function(e){
            if(e.detail.body.el.id == 'ball1' || e.detail.body.el.id == 'ball2'){
                el.components.sound.playSound();
                setTimeout(calculatePin, 3000);
            }
        })
    }
})

// push button
AFRAME.registerComponent('push-button', {
    init: function() {
        let el = this.el
        el.addEventListener('click', function(){
            window.location.reload();  
        })
        el.addEventListener('collide', function(e){
            if(e.detail.body.el.id == 'rhand' || e.detail.body.el.id == 'lhand'){
                window.location.reload();
            }
        })
    }
})

// update score
AFRAME.registerComponent('update-score', {
    init: function() {
        let el = this.el
        el.setAttribute('text.value', '0')
    },
    tick: function () {
        let el = this.el
        console.log("getscore: " + getScore())
        el.setAttribute('text', {value: getScore().toString()})
    }
})

// apply impulse to the ball
AFRAME.registerComponent('apply-impulse', {
    init: function(){
        let el = this.el
        el.addEventListener('grab-end', function(){
            console.log("grab end")
            let position = el.getAttribute('position')
            let object_position = new THREE.Vector3(position.x, position.y, position.z)

            el.body.applyImpulse(
                new CANNON.Vec3(0, 0, -10),
                new CANNON.Vec3().copy(object_position)
            )
        })
    }
})