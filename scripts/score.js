var strike = 0;

function calculatePin(){
    strike = 0;
    var down = [];
    down[0] = document.querySelector("#one");
    down[1] = document.querySelector("#two");
    down[2] = document.querySelector("#three");
    down[3] = document.querySelector("#four");
    down[4] = document.querySelector("#five");
    down[5] = document.querySelector("#six");
    down[6] = document.querySelector("#seven");
    down[7] = document.querySelector("#eight");
    down[8] = document.querySelector("#nine");
    down[9] = document.querySelector("#ten");

    for(var i = 0; i < 10; i++) {
        if(Math.trunc(down[i].getAttribute('position').y) < -0.1 ||
            (Math.trunc(down[i].getAttribute('rotation').x) >= 45 && Math.trunc(down[i].getAttribute('rotation').x) < 170) || 
            (Math.trunc(down[i].getAttribute('rotation').x) < -45 && Math.trunc(down[i].getAttribute('rotation').x) > -170) ||
            (Math.trunc(down[i].getAttribute('rotation').z) >= 45 && Math.trunc(down[i].getAttribute('rotation').z) < 170) || 
            (Math.trunc(down[i].getAttribute('rotation').z) < -45 && Math.trunc(down[i].getAttribute('rotation').z) > -170)
            ){
                strike++;
        }
    }
}

function getScore(){
    return strike;
}