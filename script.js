const canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined,
}
const maxRadius = 40;
const colorArray = [
    '#025E73',
    '#011F26',
    '#A5A692',
    '#BFB78F',
    '#F2A71B'
]

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize', e => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})


class Circle {
    constructor(x, y, dx, dy, radius, colors) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.colors = colors;

        this.draw = () => {
            c.beginPath();
            c.arc(this.x, this.y , this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.colors;
            c.fill();
        }

        this.update = () => {
            if(this.x + this.radius > (innerWidth - this.radius) || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if(this.y + this.radius > (innerHeight - this.radius) || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
        
            this.x += this.dx;
            this.y += this.dy;

            // Interactive
            if(mouse.x - this.x < 50 
                && mouse.x - this.x > -50 
                && mouse.y - this.y < 50 
                && mouse.y - this.y > - 50) {
                    if(this.radius < maxRadius) {
                        this.radius += 1;
                    }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }

            this.draw();
        }
    }
}

// Circle Array
// Inicialize Function
let circle = [];
init();

function init () {
    circle = [];

    for(i=0;i<1000;i++) {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * (innerWidth - radius * 2) + radius;
        const y =  Math.random() * (innerHeight - radius * 2) + radius;
        const dx = (Math.random() * 0.5);
        const dy = (Math.random() * 0.5);
        let colors = colorArray[ Math.floor(Math.random() * colorArray.length) ];
    
        circle.push(new Circle(x, y, dx, dy, radius, colors));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for(const circles of circle) {
        circles.update();
    }
}
animate();