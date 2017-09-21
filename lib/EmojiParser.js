import sendRequest from './sendRequest';

class EmojiParser {
  constructor(data, channel) {
    this.message = data;
    this.channel = channel;
  }

  get emoji() {
    return [
      {
        emoji: [
          'wave',
          'coffee',
          'zzz',
          'sleeping',
          'point_up',
          'eye',
          'spock-hand'
        ],
        matchers: ['morning', 'hello']
      },
      {
        emoji: [
          'pizza',
          'burrito',
          'hamburger',
          'apple',
          'fries',
          'taco',
          'fried_shrimp',
          'ramen',
          'stew',
          'sushi',
          'hotdog',
          'bread',
          'cake',
          'icecream'
        ],
        matchers: ['lunch', 'break']
      }
    ];
  }

  run() {
    let wordsArray = this.message.text.toLowerCase().match(/\b(\w+)\b/g);
    let matchingEmojis = this.emoji
      .filter(emoji =>
        wordsArray.some(word =>
          emoji.matchers.some(matcher => matcher === word)
        )
      )
      .map(
        emoji => emoji.emoji[Math.floor(Math.random() * emoji.emoji.length)]
      );
    this.buildRequest([...new Set(matchingEmojis)]);
  }

  buildRequest(matchingEmojis) {
    setTimeout(() => {
      matchingEmojis.forEach(emoji => {
        sendRequest('https://slack.com/api/reactions.add', 'EmojiParser', {
          token: process.env.API_TOKEN,
          name: emoji,
          channel: this.channel.id,
          timestamp: this.message.ts
        });
      });
    }, Math.floor(Math.random() * 60000));
  }
}

export default EmojiParser;
