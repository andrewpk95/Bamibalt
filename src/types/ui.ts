import TextData from 'src/assets/text.json';

export type UIKey = keyof typeof TextData;

export function getText(key: UIKey) {
  return TextData[key].text;
}
