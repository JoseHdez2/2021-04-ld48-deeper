import { Enemy } from "./Enemy";

export class Jellyfish extends Enemy {

    constructor (scene: Phaser.Scene, x: number, y: number)
    {
        super(scene, x, y, 
            2, "jellyfish", 1, 3, "jellyfish");
    }

}

export class FunnyJellyfish extends Jellyfish {

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        this.rotation += 0.01;
    }

}