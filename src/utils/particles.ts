
export const playerParticles = ({scene, ship, texture, frame}: 
    {scene: Phaser.Scene, ship: Phaser.Physics.Matter.Image, texture: string, frame: string}) => {
    var particles = scene.add.particles(texture);

    var emitter = particles.createEmitter({
        frame: frame,
        speed: () => {
                return 1 /* ship.body.speed */;
        },
        lifespan: () =>
            {
                return Phaser.Math.Percent(/* ship.body.speed */ 1, 0, 300) * 20000;
            }
        ,
        alpha: () => {
                return Phaser.Math.Percent(/* ship.body.speed */ 1, 0, 300) * 1000;
            }
        ,
        scale: { start: 1.0, end: 0 },
        blendMode: 'ADD'
    });

    emitter.startFollow(ship);
}