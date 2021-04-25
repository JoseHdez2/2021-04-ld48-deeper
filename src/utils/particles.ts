
export const playerParticles = ({scene, ship}: {scene: Phaser.Scene, ship: Phaser.Physics.Matter.Image}) => {
    var particles = scene.add.particles('space');

    var emitter = particles.createEmitter({
        frame: 'blue',
        speed: {
            onEmit: function (particle, key, t, value)
            {
                return ship.body.speed;
            }
        },
        lifespan: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 20000;
            }
        },
        alpha: {
            onEmit: function (particle, key, t, value)
            {
                return Phaser.Math.Percent(ship.body.speed, 0, 300) * 1000;
            }
        },
        scale: { start: 1.0, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(ship);
}