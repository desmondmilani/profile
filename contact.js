const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

class Particle {
    constructor(x, y, size, vx, vy) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.vx = vx;
        this.vy = vy;
        this.life = 100;
    }

    update(ctx) {
        console.log(ctx);
        this.moveNext()
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    moveNext() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 1;
    }
}

const addParticle = () => {

    let x = 1000;
    let y = 1000;
    let size = 50;
    let vx = 1;
    let vy = -2;

    let particle = new Particle(x, y, size, vx, vy);
    particles.push(particle)
}

const killParticle = () => {
    let i = 0;
    let length = particles.length;
    let list = [];

    for (i; i < length; i++) {
        if (particles[i].life <= 0) {
            list.push(i);
        }
    }

    i = 0;
    length = list.length;

    for (i; i < length; i++) {
        particles.splice(list[i], 1);
    }
}

const moveParticles = () => {
    let i = 0;
    let length = particles.length;

    for (i; i< length; i++) {
        particles[i].moveNext();
    }
}

const updateParticles = (ctx) => {
    let i = 0;
    let length = particles.length;

    for (i; i< length; i++) {
        particles[i].update(ctx);
    }
}




const fire = () => {
    addParticle();
    moveParticles();
    killParticle();
    updateParticles(ctx);
}

let particles = [];


setInterval(fire, 1000);