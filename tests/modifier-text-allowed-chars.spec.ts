// tslint:disable-next-line:import-name
import dedent from 'ts-dedent';
import { SpeechMarkdown } from '../src/SpeechMarkdown';

describe.skip('modifier-text-allowed-chars minus sign', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    Some (ex-text)[vol]
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Some <prosody volume="medium">ex-text</prosody>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      Some <prosody volume="medium">ex-text</prosody>
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      Some ex-text
    `;

    expect(text).toBe(expected);
  });

});

describe.skip('modifier-text-allowed-chars special chars', () => {

  const speech = new SpeechMarkdown();

  const markdown = dedent`
    This is text with (parens) but this and other special characters: []()*~@#\\_!+- are ignored
  `;

  test('converts to SSML - Amazon Alexa', () => {

    const options = {
      platform: 'amazon-alexa'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      This is text with (parens) but this and other special characters: []()*~@#\\_!+- are ignored
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to SSML - Google Assistant', () => {

    const options = {
      platform: 'google-assistant'
    };
    const ssml = speech.toSSML(markdown, options);

    const expected = dedent`
      <speak>
      This is text with (parens) but this and other special characters: []()*~@#\\_!+- are ignored
      </speak>
    `;

    expect(ssml).toBe(expected);
  });

  test('converts to Plain Text', () => {

    const options = {
    };
    const text = speech.toText(markdown, options);

    const expected = dedent`
      This is text with (parens) but this and other special characters: []()*~@#\\_!+- are ignored
    `;

    expect(text).toBe(expected);
  });

});
