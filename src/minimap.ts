
export const setupMinimap = (scene: Phaser.Scene, player: Phaser.Physics.Matter.Image, mainCam: Phaser.Cameras.Scene2D.Camera, uiLayer: Phaser.GameObjects.Layer, pauseLayer: Phaser.GameObjects.Layer) => {
    const minimapCam = scene.cameras.add(mainCam.width - 220, mainCam.height - 220, 200, 200).setZoom(0.25).setBackgroundColor("rgba(0, 0, 0, 0.2)");
    var minimapBorder = scene.add.rectangle(minimapCam.x + 100, minimapCam.y + 100, minimapCam.width, minimapCam.height).setScrollFactor(0);
    minimapBorder.setStrokeStyle(4, 0x1a65ac);
    scene.add.text(minimapCam.x, minimapCam.y - 20, 'Minimap').setScrollFactor(0);
    minimapCam.ignore(uiLayer.getChildren());
    minimapCam.ignore(pauseLayer.getChildren());

    scene.cameras.main.startFollow(player, true);
    minimapCam.startFollow(player, true);
}