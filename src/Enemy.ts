export abstract class Enemy extends Phaser.GameObjects.Sprite {
    public hp : number;
    public enemyName : string;
    public speed : number;

    public idleAnimation : string;
    public hurtSound : string;

    constructor (scene, x, y, 
        hp: number,
        enemyName: string = "enemy",
        speed: number = 1,
        scale: number = 3,
        idleAnimation? : string, 
        hurtSound : string = "damage")
    {
        super(scene, x, y, null);

        this.hp = hp;
        this.enemyName = enemyName;
        this.speed = speed;

        this.hurtSound = hurtSound;

        this.setScale(scale);
        this.setPosition(x, y);
        if(idleAnimation){
            this.play(idleAnimation);
        }
    }

}