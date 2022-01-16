// Main Variables
var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
var radius = canvas.height / 2;

// Start The Clock ( makeClock == Main Function )
context.translate(radius, radius);
radius = radius * 0.90;
setInterval(makeClock, 1000);

// Main Function For Outer Clock
function makeClock() {
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();

    // Other Functions Starts
    Face(context, radius);
    number(context, radius);
    time(context, radius);
}

// Function For Glows & Inner Clock
function Face(context, radius) {
    var grad;

    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = "white";
    context.fill();

    grad = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#696969');
    grad.addColorStop(0.5, 'rgb(156, 4, 144)');
    grad.addColorStop(1, '#222');

    context.strokeStyle = grad;
    context.lineWidth = radius * 0.1;
    context.stroke();

    context.beginPath();
    context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    context.fillStyle = "#222";
    context.fill();
}

// Make 1 - 12 Numbers On Screen
function number(context, radius) {
    var rot;
    var num;

    context.font = radius * 0.15 + "px italic";
    context.textBaseline = "middle";
    context.textAlign = "center";

    for(num = 1; num < 13; num++){

      rot = num * Math.PI / 6;

      context.rotate(rot);

      context.translate(0, -radius * 0.85);

      context.rotate(-rot);
      context.fillText(num.toString(), 0, 0);

      context.rotate(rot);
      context.translate(0, radius * 0.85);

      context.rotate(-rot);
    }
}

function time(context, radius){
    
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    // Clock (Hour)
    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    hands(context, hour, radius * 0.5, radius * 0.07);

    // Clock (Min)
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    hands(context, minute, radius * 0.8, radius * 0.07);

    // Clock (Sec)
    second = (second * Math.PI / 30);
    hands(context, second, radius * 0.9, radius * 0.02);
}

// Create Clock Hands
function hands(context, pos, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";
    context.moveTo(0,0);
    context.rotate(pos);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-pos);
  }