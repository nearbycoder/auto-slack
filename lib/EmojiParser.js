import sendRequest from './sendRequest';

class EmojiParser {
  constructor(data, channel) {
    this.message = data;
    this.channel = channel;
  }

  get emoji() {
    return [
      {
        emoji: 'wave',
        matchers: ['morning', 'morning!', 'hello', 'hello!', 'break', 'lunch']
      },
      { emoji: 'pizza', matchers: ['lunch'] }
    ];
  }

  run() {
    let wordsArray = this.message.text.toLowerCase().split(' ');
    let matchingEmojis = this.emoji
      .filter(emoji =>
        wordsArray.some(word =>
          emoji.matchers.some(matcher => matcher === word)
        )
      )
      .map(emoji => emoji.emoji);
    this.buildRequest([...new Set(matchingEmojis)]);
  }

  buildRequest(matchingEmojis) {
    matchingEmojis.forEach(emoji => {
      sendRequest('https://slack.com/api/reactions.add', 'EmojiParser', {
        token: process.env.API_TOKEN,
        name: emoji,
        channel: this.channel.id,
        timestamp: this.message.ts
      });
    });
  }
}

export default EmojiParser;
