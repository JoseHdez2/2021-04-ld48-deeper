import Phaser from "phaser";
import imgAtlas from "./assets/ld48-a.png";
import dudeImg from "./assets/dude.png";
import musicFile from "./assets/audio/sc-money.mp3";
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
    create: create
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

function create() {
  const logo = this.add.image(400, 350, "imgAtlas");
  const dude = this.add.image(100, 550, "dude") //.setScale(2);
  var blitter = this.add.blitter(0, 0, 'atlas', 'sub'); 
  var bob = blitter.create(100, 100);

  // createSpeechBubble(this, 70, 400, 250, 100, "“And now you're a boss, too... of this pile of rubble.”" );

  // createStrokeText(this, 100, 100, "Hello gorgeous", {
  //   fontFamily: "Arial Black",
  //   fontSize: 74,
  //   color: "#c51b7d"
  // });

  this.tweens.add({
    targets: logo,
    y: 250,
    duration: 4000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });

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
