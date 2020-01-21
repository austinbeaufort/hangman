function drawHangman(counter) {
    switch(counter) {
        case 0:
            makeInitialPost()
            break
        case 1:
            drawHead()
            break
        case 2:
            drawTorso()
            break
        case 3:
            drawRightArm()
            break
        case 4:
            drawLeftArm()
            break
        case 5:
            drawRightLeg()
            break
        case 6:
            drawLeftLeg()
            break
    }

}

function makeInitialPost() {
    console.log(
        `
         _____
        |     |
              |
              |
              |
              |
        =========`
            )
}

function drawHead() {
    console.log(
        `
         _____
        |     |
        O     |
              |
              |
              |
        =========`
            )
}

function drawTorso() {
    console.log(
        `
         _____
        |     |
        O     |
        |     |
        |     |
              |
        =========`
            )
}

function drawRightArm() {
    console.log(
        `
         _____
        |     |
        O     |
        |/    |
        |     |
              |
        =========`
            )
}

function drawLeftArm() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
              |
        =========`
            )
}

function drawRightLeg() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
         \\    |
        =========`
            )
}

function drawLeftLeg() {
    console.log(
        `
         _____
        |     |
        O     |
       \\|/    |
        |     |
       / \\    |
              |
        =========`
            )
}


module.exports = drawHangman