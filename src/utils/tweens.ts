
export const addVerticalSineTween = ({scene, target, y, duration}: {scene: Phaser.Scene, target: any, y: number, duration: number}) => {
    scene.tweens.add({
        targets: target,
        y: y,
        duration: duration,
        ease: 'Sine.inOut',
        yoyo: true,
        repeat: -1
    });
}