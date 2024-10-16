class Dot {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.oldPos = new Vector(x, y);
        this.friction = 0.97;
        this.gravity = new Vector(0, 0.6);
        this.mass = 1;

        this.pinned = false;  // Fixed typo here

        this.lighting = document.querySelector('.light-img');  // Use the correct selector, like class or id
        this.lightsize = 15;
    }

    update(mouse) {
        if (this.pinned) return;

        let vel = Vector.sub(this.pos, this.oldPos);
        this.oldPos.setXY(this.pos.x, this.pos.y);

        vel.mult(this.friction);
        vel.add(this.gravity);

        let { x: dx, y: dy } = Vector.sub(mouse.pos, this.pos);  // Corrected object destructuring
        const dist = Math.sqrt(dx * dx + dy * dy);

        const direction = new Vector(dx / dist, dy / dist);
        const force = Math.max((mouse.radius - dist) / mouse.radius, 0);  // Fixed "dist" spelling here

        if (force > 0.6) {
            this.pos.setXY(mouse.pos.x, mouse.pos.y);
        } else {
            this.pos.add(vel);
            this.pos.add(direction.mult(force));  // Fixed typo here
        }
    }
}
