import 'phaser';

import { createStrokeText } from "./utils/text";

export default class Demo extends Phaser.Scene
{
    constructor ()
    {
        super('demo');
    }

    preload ()
    {
        // this.load.audio("theme", [musicFile]);
        this.load.image("dude", 'assets/dude.png');
        this.load.atlas('atlas', "assets/ld48-a.png", 'assets/atlas.json');
    }

    player : any
    cursors: any

    create ()
    {

        const dude = this.add.image(100, 550, "dude") //.setScale(2);
        this.player = this.physics.add.image(200, 200, 'atlas', 'sub');
        this.player.setCollideWorldBounds(true);
      
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys(
          {up:Phaser.Input.Keyboard.KeyCodes.W,
          down:Phaser.Input.Keyboard.KeyCodes.S,
          left:Phaser.Input.Keyboard.KeyCodes.A,
          right:Phaser.Input.Keyboard.KeyCodes.D});

        createStrokeText({thiz: this, x: 100, y: 20, text: "DEEPER BLUE", style: {
          fontFamily: "Arial Black",
          fontSize: 74,
          color: "white"
        }, stroke: {color: "blue", size: 6}});

        this.tweens.add({
            targets: dude,
            y: 500,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            repeat: -1
        })
    }

    speed = 300;

    update() {
        this.updatePlayerVelocity({player: this.player, cursors: this.cursors, speed: this.speed});
    }

    private updatePlayerVelocity({player, cursors, speed}) {
        player.setVelocity(0);

        if (cursors.left.isDown) {
            player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            player.setVelocityX(speed);
        }

        if (cursors.up.isDown) {
            player.setVelocityY(-speed);
        } else if (cursors.down.isDown) {
            player.setVelocityY(speed);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: Demo,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
      },
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);
