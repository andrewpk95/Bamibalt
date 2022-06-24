export default function multiplyTintColor(color: number, tintColor: number) {
  const colorStruct = Phaser.Display.Color.IntegerToColor(color);
  const tintColorStruct = Phaser.Display.Color.IntegerToColor(tintColor);

  colorStruct.redGL *= tintColorStruct.redGL;
  colorStruct.greenGL *= tintColorStruct.greenGL;
  colorStruct.blueGL *= tintColorStruct.blueGL;

  return colorStruct.color;
}
