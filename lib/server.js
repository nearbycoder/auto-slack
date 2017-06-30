import slack from './slack';
import { getChannel, getMember } from './slackHelpers';
import EmojiParser from './EmojiParser';

let channels = [];
let members = [];

// Need to add ability to refetch Channel and Users when list updates
slack.on('start', () => {
  slack.getChannels().then(function(data) {
    channels = data.channels;
  });
  slack.getUsers().then(function(data) {
    members = data.members;
  });
});

slack.on('message', data => {
  let channel = getChannel(data, channels) || {};
  let member = getMember(data, members) || {};

  if (data.type === 'message') {
    if (channel.name === 'munstersuniversity') {
      new EmojiParser(data, channel).run();
    }
  }
});
