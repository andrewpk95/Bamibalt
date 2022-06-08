const GameSettings = {
  camera: {
    offsetX: 200, // Pixel
    offsetY: 200, // Pixel
  },
  bamiko: {
    jumpVelocity: 900, // Pixel / sec.
    doubleJumpVelocity: 750, // Pixel / sec.
  },
  difficulty: {
    maxLevel: 2,
    levels: [
      {
        level: 0,
        minSpeed: 500, // Pixel / sec.
        maxSpeed: 700, // Pixel / sec.
        acceleration: 100, // Velocity / sec.
        recoverTime: 5.0, // Seconds
        toNextLevelTime: 15.0, // Seconds
      },
      {
        level: 1,
        minSpeed: 800, // Pixel / sec.
        maxSpeed: 1100, // Pixel / sec.
        acceleration: 125, // Velocity / sec.
        recoverTime: 7.5, // Seconds
        toNextLevelTime: 30.0, // Seconds
      },
      {
        level: 2,
        minSpeed: 1100, // Pixel / sec.
        maxSpeed: 1500, // Pixel / sec.
        acceleration: 150, // Velocity / sec.
        recoverTime: 10.0, // Seconds
        toNextLevelTime: 10.0, // Seconds
      },
    ],
  },
};

export default GameSettings;
