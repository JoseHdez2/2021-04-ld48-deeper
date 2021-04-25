import 'phaser';
import { Bullet } from './Bullet';
import { setupMinimap } from './minimap';

import { createStrokeText } from "./utils/text";
import { addVerticalSineTween } from './utils/tweens';

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

    player : Phaser.Physics.Matter.Image
    playerData = { hp: 100 }
    cursors: any
    posText : Phaser.GameObjects.Text
    playerDataText : Phaser.GameObjects.Text
    isPaused = false

    bullets

    // pauseLayer : Phaser.GameObjects.Layer

    create ()
    {
        const gameplayLayer = this.add.layer();
        const uiLayer = this.add.layer().setDepth(10);
        const pauseLayer = this.add.layer().setDepth(20);

        uiLayer.add(this.add.text(10, 10, 'DEEPER BLUE DEMO v0.1').setScrollFactor(0));
        this.posText = this.add.text(10, 25, `x: ???, y: ???`).setScrollFactor(0);
        this.playerDataText = this.add.text(10, 45, `hp: ???`).setScrollFactor(0);

        uiLayer.add(this.posText);
        uiLayer.add(this.playerDataText);

        this.player = this.matter.add.image(200, 200, 'atlas', 'sub').setScale(3);

        // this.bullets = this.physics.add.group({
        //     classType: Bullet,
        //     maxSize: 30,
        //     runChildUpdate: true
        // });

        // this.player.setCollideWorldBounds(true);

        for (let i = 0; i < 32; i++)
        {
            let x = Phaser.Math.Between(-800, 800);
            let y = Phaser.Math.Between(-800, 800);

            gameplayLayer.add(this.make.sprite({ x, y, key: 'atlas', frame: 'jellyfish' }));
        }

        this.setupWasdCursors();

        const mainCam = this.cameras.main;

        let pauseTitle = createStrokeText({thiz: this, x: mainCam.width / 2 - 30, y: 20, text: "PAUSE", style: {
            fontFamily: "Arial Black",
            fontSize: 74,
            color: "white"
        }, stroke: {color: "blue", size: 6}}).setScrollFactor(0);
        pauseLayer.add(pauseTitle);
        pauseLayer.setVisible(false);

        // var titleText = createStrokeText({thiz: this, x: 100, y: 20, text: "DEEPER BLUE", style: {
        //   fontFamily: "Arial Black",
        //   fontSize: 74,
        //   color: "white"
        // }, stroke: {color: "blue", size: 6}});
        // addVerticalSineTweens({scene: this, target: titleText, y: 100, duration: 10_000});

        setupMinimap(0.15, this, this.player, mainCam, uiLayer, pauseLayer);

        // this.physics.add.overlap(bullets, enemies, this.hitEnemy, this.checkBulletVsEnemy, this);

        this.setupInputEvents(pauseLayer);

        this.player.setFixedRotation();
        this.player.setFrictionAir(0.2);
        this.player.setMass(30);
    }

    playerSpeed = 0.1;

    private setupInputEvents(pauseLayer: Phaser.GameObjects.Layer) {
        this.input.keyboard.on('keydown', function (event) {
            if ([Phaser.Input.Keyboard.KeyCodes.P, Phaser.Input.Keyboard.KeyCodes.ESC].includes(event.keyCode)) {
                pauseLayer.setVisible(!pauseLayer.visible);
            }
        });

        this.input.on('pointerdown', function () {
            this.cameras.main.shake(300);
            this.playerData = { hp: this.playerData.hp - 10 };
        }, this);

        this.cameras.main.on('camerashakestart', function () {
            this.cameras.main.setBackgroundColor('rgba(255, 0, 0, 0.5)');
        }, this);

        this.cameras.main.on('camerashakecomplete', function () {
            this.cameras.main.setBackgroundColor('#125555');
        }, this);
    }

    private setupWasdCursors() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });
    }

    update() {
        this.updatePlayerVelocity({player: this.player, cursors: this.cursors, speed: this.playerSpeed});
        this.posText.setText(`x: ${Math.round(this.player.x)}, y: ${Math.round(this.player.y)}`);
        this.playerDataText.setText(`hp: ${this.playerData.hp}`);
        // this.physics.world.wrap(this.player, 800);
    }

    private updatePlayerVelocity({player, cursors, speed}) {
        if (cursors.left.isDown) {
            player.thrustBack(speed);
        } else if (this.cursors.right.isDown) {
            player.thrust(speed);
        }

        if (cursors.up.isDown) {
            player.thrustLeft(speed);
        } else if (cursors.down.isDown) {
            player.thrustRight(speed);
        }
    }
}

const config = {
    antialias: false,
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 900,
    height: 800,
    scene: Demo,
    physics: {
        default: 'matter',
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: true
        }
    },
    audio: {
        disableWebAudio: true
    }
};

const game = new Phaser.Game(config);
