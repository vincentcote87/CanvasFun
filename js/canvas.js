var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// var point =[
//     {x:100 , y:100 },
//     {x:145 , y:100 },
//     {x:145 , y:130 },
//     {x:175 , y:175 },
//     {x:145 , y:175 },
//     {x:055 , y:175 },
//     {x:055 , y:145 },
//     {x:100 , y:145 },
//     {x:100 , y:100 }
// ];



function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.draw = function() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.shoot = function() {
        var bullet = new Rectangle(this.x, this.y, 1, 1);
        bullet.draw();
        for (var i = 0; i < canvas.height; i++) {
            bullet.y--;
            bullet.draw();
        }
    }

    this.move = function(direction) {
        switch (direction) {
            case 38 : this.y--; break;
            case 40 : this.y++; break;
            case 39 : this.x++; break;
            case 37 : this.x--; break;
            case 32 : this.shoot(); break;
            default: break;
        }
        this.draw();
    }
}

var myRect = new Rectangle(20, 40, 20, 20);
myRect.draw();

var moveDirection = undefined;

document.addEventListener("keydown", function(event) {
    console.log(event.keyCode);
    moveDirection = event.keyCode;
});

document.addEventListener("keyup", function() {
    moveDirection = undefined;
})

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, 800, 600);
    myRect.move(moveDirection);
}

animate();



// ctx.beginPath();
// ctx.moveTo(point[0].x*2, point[0].y*2);

// for(var i = 1; i < point.length; i++) {
//     ctx.lineTo(point[i].x*2, point[i].y*2)
// }
// ctx.stroke();


// for(var i = 1; i < point.length; i++) {
//     ctx.beginPath();
//     ctx.arc(point[i].x, point[i].y, 3, 0, Math.PI * 2, true);
//     ctx.fill();
//     ctx.stroke();
// }

// document.addEventListener("keypress", function(event) {
//     console.log(event);
// })


// ctx.fillStyle = "#45bb7c"
// ctx.fillRect(20, 20, 100, 100);

// ctx.fillStyle = "#ab329d";
// ctx.fillRect(200, 20, 100, 100);

// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 20);
// ctx.lineTo(400, 500);
// ctx.strokeStyle = "#c823da";
// ctx.stroke();

// ctx.beginPath();
// ctx.arc(400, 200, 50, 0, Math.PI *2, true);
// ctx.strokeStyle = "#565656";
// ctx.stroke();

// for (var i = 20; i < 590; i += 40 ) {
//     for (var j = 20; j < 790; j += 40) {
//         ctx.beginPath();
//         ctx.arc(j, i, 20, 0, Math.PI * 2, true);
//         ctx.fillStyle = 'rgb(180, '+ i/4 % 255 +','+ j/4 % 255 +')';
//         ctx.fill();
//         ctx.stroke();
//     }
// }

// ctx.beginPath();
// ctx.arc(400, 300, 50, 0, Math.PI *2, true);
// ctx.fillStyle = "pink";
// ctx.fill();


// function animate() {
//     requestAnimationFrame(animate);
    
//     x = document.onmousemove
//     y = canvas.clientY;

//     console.log(x+ y);

// }

// animate();
// document.onmousemove = reportCoordinates;

// document.onmousedown = startPath( function() { return reportCoordinates()});

// canvas.addEventListener("mousedown", function(event) {
//     var coordinate = reportCoordinates(canvas, event);
//     startPath(coordinate);
// })

// canvas.addEventListener("mouseup", function(event) {
//     var coordinate = reportCoordinates(canvas, event);
//     endPath(coordinate);
// })

// // document.onmousedown = function() {
// //     console.log(ctx.clientX);
// // }

// // document.onmouseup = function() {
// //     console.log("Mouse is up");
// // }

// // document.onmouseup = endPath(reportCoordinates);

// function reportCoordinates(canvas, event) {
//     var canvasBounds = canvas.getBoundingClientRect();
//     return {
//         x: event.clientX - canvasBounds.left,
//         y: event.clientY - canvasBounds.top
//     }
// }


// function startPath(coordinate) {
//     console.log("mousedown");
//     ctx.beginPath();
//     ctx.moveTo(coordinate.x, coordinate.y);
// }

// function endPath(coordinate) {
//     ctx.lineTo(coordinate.x, coordinate.y);
//     ctx.stroke();
// }

// function draw() {
//     ctx.clearRect(0, 0, 800, 600);
// }