import { GameMode } from 'src/types/mode';

const GameSettings = {
  camera: {
    offsetX: 200, // Pixel
    damagedOffsetX: 400, // Pixel
    offsetY: 200, // Pixel
  },
  bamiko: {
    jumpVelocity: 900, // Pixel / sec.
    maxJumpDuration: 0.25, // Seconds
    doubleJumpVelocity: 800, // Pixel / sec.
    maxDoubleJumpDuration: 0.2, // Seconds
  },
  yuri: {
    followDistance: 300, // Pixel
  },
  obstacle: {
    building: {
      height: 300,
    },
  },
  difficulty: {
    [GameMode.Classic]: {
      levels: [
        {
          level: 1,
          gap: 450, // Pixel
          minSpeed: 500, // Pixel / sec.
          maxSpeed: 700, // Pixel / sec.
          acceleration: 100, // Velocity / sec.
          recoverTime: 5.0, // Seconds
          toNextLevelTime: 10.0, // Seconds
        },
        {
          level: 2,
          gap: 500, // Pixel
          minSpeed: 600, // Pixel / sec.
          maxSpeed: 850, // Pixel / sec.
          acceleration: 125, // Velocity / sec.
          recoverTime: 6.0, // Seconds
          toNextLevelTime: 15.0, // Seconds
        },
        {
          level: 3,
          gap: 550, // Pixel
          minSpeed: 700, // Pixel / sec.
          maxSpeed: 1000, // Pixel / sec.
          acceleration: 150, // Velocity / sec.
          recoverTime: 7.0, // Seconds
          toNextLevelTime: 20.0, // Seconds
        },
        {
          level: 4,
          gap: 700, // Pixel
          minSpeed: 1000, // Pixel / sec.
          maxSpeed: 1300, // Pixel / sec.
          acceleration: 200, // Velocity / sec.
          recoverTime: 8.0, // Seconds
          toNextLevelTime: 30.0, // Seconds
        },
        {
          level: 5,
          gap: 900, // Pixel
          minSpeed: 1400, // Pixel / sec.
          maxSpeed: 1700, // Pixel / sec.
          acceleration: 300, // Velocity / sec.
          recoverTime: 9.0, // Seconds
          toNextLevelTime: 15.0, // Seconds
        },
      ],
    },
    [GameMode.Extreme]: {
      levels: [
        {
          level: 1,
          gap: 550, // Pixel
          minSpeed: 700, // Pixel / sec.
          maxSpeed: 1000, // Pixel / sec.
          acceleration: 150, // Velocity / sec.
          recoverTime: 7.0, // Seconds
          toNextLevelTime: 10.0, // Seconds
        },
        {
          level: 2,
          gap: 700, // Pixel
          minSpeed: 1000, // Pixel / sec.
          maxSpeed: 1300, // Pixel / sec.
          acceleration: 200, // Velocity / sec.
          recoverTime: 8.0, // Seconds
          toNextLevelTime: 20.0, // Seconds
        },
        {
          level: 3,
          gap: 900, // Pixel
          minSpeed: 1400, // Pixel / sec.
          maxSpeed: 1700, // Pixel / sec.
          acceleration: 300, // Velocity / sec.
          recoverTime: 9.0, // Seconds
          toNextLevelTime: 15.0, // Seconds
        },
      ],
    },
    [GameMode.Estelle]: {
      levels: [
        {
          level: 1,
          gap: 450, // Pixel
          minSpeed: 500, // Pixel / sec.
          maxSpeed: 700, // Pixel / sec.
          acceleration: 100, // Velocity / sec.
          recoverTime: 5.0, // Seconds
          toNextLevelTime: 10.0, // Seconds
        },
        {
          level: 2,
          gap: 500, // Pixel
          minSpeed: 600, // Pixel / sec.
          maxSpeed: 850, // Pixel / sec.
          acceleration: 125, // Velocity / sec.
          recoverTime: 6.0, // Seconds
          toNextLevelTime: 15.0, // Seconds
        },
        {
          level: 3,
          gap: 550, // Pixel
          minSpeed: 700, // Pixel / sec.
          maxSpeed: 1000, // Pixel / sec.
          acceleration: 150, // Velocity / sec.
          recoverTime: 7.0, // Seconds
          toNextLevelTime: 20.0, // Seconds
        },
        {
          level: 4,
          gap: 700, // Pixel
          minSpeed: 1000, // Pixel / sec.
          maxSpeed: 1300, // Pixel / sec.
          acceleration: 200, // Velocity / sec.
          recoverTime: 8.0, // Seconds
          toNextLevelTime: 30.0, // Seconds
        },
        {
          level: 5,
          gap: 900, // Pixel
          minSpeed: 1400, // Pixel / sec.
          maxSpeed: 1700, // Pixel / sec.
          acceleration: 300, // Velocity / sec.
          recoverTime: 9.0, // Seconds
          toNextLevelTime: 15.0, // Seconds
        },
      ],
    },
  },
};

export default GameSettings;
