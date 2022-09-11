
const ESC = "\x1b[1;"
const BLK = 30
const RED = 31
const GRN = 32
const YEL = 33
const BLU = 34
const MAG = 35
const CYN = 36
const WHT = 37
const RES = 0

function bg(fg) {
    return fg + 10
}

function ansi(color) {
    return `\x1b[1;${color}m`
}

function color2(str, style1, style2) {
    return `${ansi(style2)}${ansi(style1)}${str}${ansi(RES)}`
}

function color(str, style1) {
    return `${ansi(style1)}${str}${ansi(RES)}`
}

function green(str) {
    return color(str, GRN)
}

function yellow(str) {
    return color(str, YEL)
}

function red(str) {
    return color(str, RED)
}

function blue(str) {
    return color(str, BLU)
}

function magenta(str) {
    return color(str, MAG)
}

function cyan(str) {
    return color(str, CYN)
}

function white(str) {
    return color(str, WHT)
}

function black(str) {
    return color(str, BLK)
}

function error(str) {
    console.log(red(str))
}

function fatal(str) {
    console.trace(color2(str, WHT, bg(RED)))
}

function warn(str) {
    console.log(color2(str, BLK, bg(YEL)))
}

function log(str) {
    console.log (color2(` ${new Date().toISOString()} `, BLK, bg(WHT)) + " " + str)
}

console.log (red("This is a error"))
console.log (yellow("This is a warning"))
console.log (green("This is good"))
console.log ("Regular text")
console.log (color2("Black on white", BLK, bg(WHT)))
console.log (color2("Red on yellow", RED, bg(YEL)))
console.log (color2("Black on yellow", BLK, bg(YEL)))
console.log (color2("White on blue", WHT, bg(BLU)))
console.log (color2("White on green", WHT, bg(GRN)))
console.log (color2("White on yellow", WHT, bg(YEL)))
fatal("This is fatal")
error("This is also an error")
warn("This is an warning")
let num = 17
let num2 = 2
log(`This is a log message of a number: ${num}`)
for (let i = 0; i<1000000000; i++) {
    num2 = 34*74+1/34*0.3%34 * num2
    num2 = num2 + num
}
log(`This is a log message of a number: ${num+num2}`)

