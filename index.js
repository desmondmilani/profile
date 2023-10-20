// class for particle
class Particle {
    constructor(x, y, color = 'blue', type = 'fill') {
        this.location = new Vector(x, y);
        let data = this.construct();
        this.size = data.size;
        this.velocity = data.velocity;
        this.color = color;
        this.type = type;
        this.life = 200;
    }

    move = () => {
        this.location.a += this.velocity.a;
        this.location.b += this.velocity.b;
        this.life -= 1;
    }

    draw = (cx) => {
        if (this.type === 'fill') {
            cx.fillStyle = this.color;
            cx.fillRect(this.location.a, this.location.b, this.size.a, this.size.b);
        } else if (this.type === 'stroke') {
            cx.strokeStyle = this.color;
            cx.strokeRect(this.location.a, this.location.b, this.size.a, this.size.b)
        }
    }

    construct = () => {
        let w, h, vx, vy;

        w = Math.ceil(Math.random() * 10 + 5);
        h = Math.ceil(Math.random() * 10 + 5);

        let r1 = Math.ceil(Math.random() * 4);
        let neg = -1;

        if (r1 < 2) {
            neg = -1;
        } else {
            neg = 1;
        }

        vx = (Math.ceil(Math.random() * 5 + 1)) * neg;

        r1 = Math.ceil(Math.random() * 4)

        if (r1 < 2) {
            neg = -1;
        } else {
            neg = 1;
        }

        vy = (Math.ceil(Math.random() * 5 + 1)) * neg;

        let size = new Vector(w, h);
        let velocity = new Vector(vx, vy);

        return {size, velocity};
    }
}

// class for vector quantity
class Vector {
    constructor (a, b) {
        this.a = a;
        this.b = b;
    }
}

// class for particle system
//let colors = ['red', 'green', 'blue', 'yellow', 'purple', 'gray', 'lime', 'pink', 'orange', 'brown'];
let colors = ['rgb(0, 0, 20)', 'rgb(5, 0, 40)', 'rgb(10, 0, 60)', 'rgb(0, 0, 80)', 'rgb(10, 20, 100)', 'rgb(0, 10, 120)', 'rgb(0, 0, 140)', 'rgb(15, 0, 160)', 'rgb(0, 15, 180)', 'rgb(0, 0, 200)'];
class ParticleSystem {
    constructor(canvas) {
        this.particles = [];
        this.canvas = canvas;
        this.cx = this.canvas.getContext('2d');
    }

    addAuto = () => {
        let x = Math.ceil(Math.random() * this.canvas.width);
        let y = Math.ceil(Math.random() * this.canvas.height);

        let cp = Math.floor(Math.random() * 10);

        let color = colors[cp];

        let particle = new Particle(x, y, color);

        this.particles.push(particle);
    }

    add = (x, y) => {

        let cp = Math.floor(Math.random() * 10);

        let color = colors[cp];

        let particle = new Particle(x, y, color);

        this.particles.push(particle);
    }

    removeDeadParticles = () => {
        let i = 0;
        let length = this.particles.length;

        let list = [];

        for (i; i < length; i++) {
            if (this.particles[i].life < 1) {
                list.push(i);
            }
        }

        length = list.length;
        i = length;

        for (i; i > 0; i--) {
            let pos = i - 1;

            this.particles.splice(pos, 1);
        }
    }

    next = () => {
        let i = 0;
        let length = this.particles.length;

        for (i; i < length; i++) {
            this.particles[i].move();
        }

        //this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cx.fillStyle = 'rgba(0,0,0,0.01)';
        this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.removeDeadParticles();

        i = 0;
        length = this.particles.length;

        for (i; i < length; i++) {
            this.particles[i].draw(this.cx);
        }

        this.printLines();
    }

    printLines = () =>{
        let i = 0;
        let length = this.particles.length;
        let tmp1, tmp2;


        for (i; i < length; i++) {
            let j = 0;
            tmp1 = this.particles[i];

            for (i; j < length; j++) {
                tmp2 = this.particles[j];
                let a = tmp1.location.a - tmp2.location.a;
                let b = tmp1.location.b - tmp2.location.b;

                if (a < 0) {
                    a = a * -1;
                }

                if (b < 0) {
                    b = b * -1;
                }

                


                if (a < 100 && b < 100) {
                    let x1 = tmp1.location.a + (tmp1.size.a / 2);
                    let x2 = tmp2.location.a + (tmp2.size.a / 2);

                    let y1 = tmp1.location.b + (tmp1.size.b / 2);
                    let y2 = tmp2.location.b + (tmp2.size.b / 2);

                    let color = tmp1.color;

                    this.cx.strokeStyle = color;

                    this.cx.beginPath();
                    this.cx.moveTo(x1, y1);
                    this.cx.lineTo(x2, y2);
                    this.cx.stroke();
                }
            }
        }
    }
}

// function to create particles
const createParticles = (ps, count) => {
    let i = 0;
    let length = count;
    
    for (i; i < length; i++) {
        ps.addAuto();
    }
}

// function to collusion
const collide = (box1, box2) => {
    let flag = false;

    let b1p1 = new Vector(box1.location.a, box1.location.b);
    let b1p2 = new Vector(box1.location.a + box1.size.a, box1.location.b);
    let b1p3 = new Vector(box1.location.a, box1.location.b + box1.size.b);
    let b1p4 = new Vector(box1.location.a + box1.size.a, box1.location.b + box1.size.b);

    let b2p1 = new Vector(box2.location.a, box2.location.b);
    let b2p2 = new Vector(box2.location.a + box2.size.a, box2.location.b);
    let b2p3 = new Vector(box2.location.a, box2.location.b + box2.size.b);
    let b2p4 = new Vector(box2.location.a + box2.size.a, box2.location.b + box2.size.b);

    if(checkPoint(b1p1, b2p1, b2p2, b2p3, b2p4)) {
        if (checkPoint(b1p2, b2p1, b2p2, b2p3, b2p4)) {
            if (checkPoint(b1p3, b2p1, b2p2, b2p3, b2p4)) {
                if (checkPoint(b1p4, b2p1, b2p2, b2p3, b2p4)) {
                    flag = true;
                }
            }
        }
    }

    return flag;

}

// function to check points
const checkPoint = (p1, t1, t2, t3, t4) => {
    if ((p1.a >= t1.a && p1.a <= t2.a) && (p1.b >= t1.b && p1.b <= t4.b)) {
        return true;
    } else {
        return false;
    }
}

// function to save image
const saveAsImage = () => {
    console.log("click");
    let image = canvas.toDataURL("image/png");

    let a = document.createElement('a');
    a.download = 'image.png';
    a.href = image;
    a.click();
    
    //console.log(image);
    //window.location.href=image;
}

// test particle

let canvas = document.getElementById('canvas');
let container = document.getElementById('container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let p = new ParticleSystem(canvas);

container.addEventListener('mousemove', (e) => {
    let x = e.clientX;
    let y = e.clientY;

    let i = 0;
    let length = 1;

    for (i; i < length; i++) {
        p.add(x, y);
    }
});

let number = 0;
let numberToReach = 20;

setInterval(() => {
    p.next();

    number++;

    if (number >= numberToReach ) {
        number = 0;
        createParticles(p, 20);
    }
}, 100);
