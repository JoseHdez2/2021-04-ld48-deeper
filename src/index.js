import Phaser from "phaser";
import imgAtlas from "./assets/ld48-a.png";
import dudeImg from "./assets/dude.png";
import musicFile from "./assets/audio/shipping-lanes.ogg";
import { createSpeechBubble } from "./util/bubble";
import { createStrokeText } from "./util/text";
import atlasJson from "./assets/atlas.json";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
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

function preload() {
  // this.load.audio("theme", [musicFile]);
  this.load.image("dude", dudeImg);
  this.load.image("imgAtlas", imgAtlas);
  this.load.atlas('atlas', imgAtlas, atlasJson);
}

var cursors, player;

function create() {
  const logo = this.add.image(400, 350, "imgAtlas");
  const dude = this.add.image(100, 550, "dude") //.setScale(2);
  var blitter = this.add.blitter(0, 0, 'atlas', 'sub'); 
  var bob = blitter.create(100, 100);

  // createSpeechBubble(this, 70, 400, 250, 100, "“And now you're a boss, too... of this pile of rubble.”" );

  createStrokeText({thiz: this, x: 100, y: 20, text: "DEEPER BLUE", style: {
    fontFamily: "Arial Black",
    fontSize: 74,
    color: "white"
  }, stroke: {color: "blue", size: 6}});

  this.tweens.add({
    targets: logo,
    y: 250,
    duration: 4000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
  cursors = this.input.keyboard.addKeys(
    {up:Phaser.Input.Keyboard.KeyCodes.W,
    down:Phaser.Input.Keyboard.KeyCodes.S,
    left:Phaser.Input.Keyboard.KeyCodes.A,
    right:Phaser.Input.Keyboard.KeyCodes.D});
  
  player = this.physics.add.image(400, 300, 'dude');
  player.setCollideWorldBounds(true);

  // tgame.add.button(
  //   game.world.centerX - 95,
  //   400,
  //   "button",
  //   (nothing) => {},
  //   this,
  //   2,
  //   1,
  //   0
  // );

  // var music = this.sound.add("theme");

  // music.play();
}

const speed = 300;

function update() {
  // console.log("hello")
  player.setVelocity(0);

  if (cursors.left.isDown) {
      player.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
      player.setVelocityX(300);
  }

  if (cursors.up.isDown) {
      player.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
      player.setVelocityY(speed);
  }
}