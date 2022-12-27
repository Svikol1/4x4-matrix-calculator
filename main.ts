/**
 * Connect a 4x4 matrix keypad like this:
 * 
 * Rows:
 * 
 * keypad / micro:bit pin
 * 
 * 1.          0
 * 
 * 2.          1
 * 
 * 3.          2
 * 
 * 4           8
 * 
 * Columns
 * 
 * 5.         13
 * 
 * 6.         14
 * 
 * 7.         15
 * 
 * 8.         16
 * 
 * Keys:
 * 
 * A = x
 * 
 * B = /
 * 
 * C = -
 * 
 * D = +
 * 
 * * = .
 * 
 * # = =
 */
function scanKeys () {
    pins.digitalWritePin(DigitalPin.P0, 0)
    pins.digitalWritePin(DigitalPin.P8, 1)
    if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        buildString(".")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        buildString("0")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        evaluateNumber()
        basic.showString("=")
        basic.pause(50)
        calculate()
    } else if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        evaluateNumber()
        operator = "+"
        basic.showString("+")
    } else {
        basic.clearScreen()
    }
    pins.digitalWritePin(DigitalPin.P8, 0)
    pins.digitalWritePin(DigitalPin.P2, 1)
    if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        buildString("7")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        buildString("8")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        buildString("9")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        evaluateNumber()
        operator = "-"
        basic.showString("-")
    } else {
        basic.clearScreen()
    }
    pins.digitalWritePin(DigitalPin.P2, 0)
    pins.digitalWritePin(DigitalPin.P1, 1)
    if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        buildString("4")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        buildString("5")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        buildString("6")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        evaluateNumber()
        operator = "/"
        basic.showString("/")
    } else {
        basic.clearScreen()
    }
    pins.digitalWritePin(DigitalPin.P1, 0)
    pins.digitalWritePin(DigitalPin.P0, 1)
    if (pins.digitalReadPin(DigitalPin.P13) == 1) {
        buildString("1")
    } else if (pins.digitalReadPin(DigitalPin.P14) == 1) {
        buildString("2")
    } else if (pins.digitalReadPin(DigitalPin.P15) == 1) {
        buildString("3")
    } else if (pins.digitalReadPin(DigitalPin.P16) == 1) {
        evaluateNumber()
        operator = "x"
        basic.showString("x")
    } else {
        basic.clearScreen()
    }
}
function buildString (key: string) {
    basic.showString(key)
    numberString = "" + numberString + key
}
function clear () {
    numberString = ""
    a = ""
    b = ""
    operator = ""
}
function evaluateNumber () {
    if (a == "") {
        a = numberString
        numberString = ""
    } else if (b == "") {
        b = numberString
        numberString = ""
    }
}
function calculate () {
    if (a == "" || b == "") {
        basic.showString("e")
    } else if (operator == "+") {
        basic.showNumber(parseFloat(a) + parseFloat(b))
    } else if (operator == "-") {
        basic.showNumber(parseFloat(a) - parseFloat(b))
    } else if (operator == "x") {
        basic.showNumber(parseFloat(a) * parseFloat(b))
    } else if (operator == "/") {
        basic.showNumber(parseFloat(a) / parseFloat(b))
    }
}
let b = ""
let a = ""
let numberString = ""
let operator = ""
clear()
basic.forever(function () {
    while (true) {
        scanKeys()
        if (input.buttonIsPressed(Button.A)) {
            basic.showString("c")
            clear()
        }
        if (input.buttonIsPressed(Button.B)) {
            basic.showString(a)
            basic.showString(operator)
            basic.showString(b)
        }
    }
})
