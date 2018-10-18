var canvas = document.getElementById('clock');
var ctx = canvas.getContext('2d');

var width = 600;
var height = 600;
canvas.width = width;
canvas.height = height;
var x = canvas.width / 2;
var y = canvas.height / 2;
var radius = 40;
var lineWidth = 35;

var speed = 0;

var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

function speedUp() {
    if (speed <= 0)
        speed = 1;
    if (speed < 30000)
        speed *= 8;
}

function slowDown() {
    speed /= 8;
    if (speed <= 1)
        speed = 0;
}

function regularSpeed() {
    speed = 0;
}

function resetClock() {
    speed = -1;
}

function animate(date) {
    var date = new Date(date);
    if (speed > 0)
        date.setSeconds((date.getSeconds()) + speed);
    else {
        date.setMilliseconds((date.getMilliseconds() + (1000/60)));
    }
    requestAnimationFrame(function() {
        animate(speed > -1 ? date : new Date());
    });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#090909";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var sec = new TimeCircle(x, y, radius, lineWidth, 1, ((Math.PI * 2 / 60) * date.getSeconds() + Math.PI * 3 / 2), '#329652');
    var min = new TimeCircle(x, y, radius, lineWidth, 2, ((Math.PI * 2 / 60) * date.getMinutes() + Math.PI * 3 / 2), '#c551ab');
    var hour = new TimeCircle(x, y, radius, lineWidth, 3, ((Math.PI * 2 / 24) * date.getHours() + Math.PI * 3 / 2), '#5369c6');
    var day = new TimeCircle(x, y, radius, lineWidth, 4, ((Math.PI * 2 / monthDivider(date.getMonth(), date.getFullYear())) * date.getDate() + Math.PI * 3 / 2), '#d6d483');
    var month = new TimeCircle(x, y, radius, lineWidth, 5, ((Math.PI * 2 / 12) * date.getMonth() + Math.PI * 3 / 2), '#e2c2eb');

    sec.draw();
    min.draw();
    hour.draw();
    day.draw();
    month.draw();

    var time = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
        ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":" + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()) +
        ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(time, 30, height - 10);
    // ctx.fillText(date.getSeconds(), x - 10, y - radius - 30);
    // ctx.fillText(date.getMinutes(), x - 10, y - (radius * 2) - 30);
    // ctx.fillText(date.getHours(), x - 10, y - (radius * 3) - 30);
    // ctx.fillText(date.getDate(), x - 10, y - (radius * 4) - 30);
    // ctx.fillText(date.getMonth(), x - 10, y - (radius * 5) - 30);
}

animate(new Date());

function TimeCircle(x, y, radius, strokeWidth, radiusMultiplyer, end, colour) {
    this.x = x;
    this.y = y;
    this.radiusMultiplyer = radiusMultiplyer;
    this.start = Math.PI * 3 / 2;
    this.end = end;
    this.radius = radius + (strokeWidth * radiusMultiplyer);
    this.strokeWidth = strokeWidth;
    this.colour = colour;

    this.draw = function () {
        ctx.beginPath(x, y);
        ctx.arc(this.x, this.y, this.radius, this.start, this.end, this.false);
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.colour;
        ctx.lineCap = 'round';
        ctx.stroke();
    }
}

function monthDivider(month, year) {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 1:
            if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                return 29
            } else {
                return 28
            };
        default:
            return 31;
    }
}
