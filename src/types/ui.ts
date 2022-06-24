import TextData from 'src/assets/text.json';

export type UIKey = keyof typeof TextData;

const numberRegex = /([0-9]+)/g;
const parameterRegex = /(\{[0-9]+\})/g;

export function getText(key: UIKey, parameters?: object) {
  const rawText = TextData[key].text;
  const matchedParameterText = rawText.match(parameterRegex);
  let result = rawText;

  if (!matchedParameterText) {
    return result;
  }

  matchedParameterText.forEach((paramText) => {
    const number = paramText.match(numberRegex)?.[0];

    if (!number) {
      return;
    }
    const arg = parameters?.[number];

    if (arg === undefined) {
      return;
    }

    result = result.replace(paramText, `${arg}`);
  });

  return result;
}
