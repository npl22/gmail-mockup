const MessageStore = require('./message_store.js');

const Sent = {
  render: () => {
    const messages = MessageStore.getSentMessages();
    const ul = document.createElement('ul');
    ul.className = 'messages';

    messages.forEach((message) => {
      ul.appendChild(Sent.renderMessage(message));
    });

    return ul;
  },

  renderMessage: (message) => {
    const li = document.createElement('li');
    li.className = 'message';
    li.innerHTML = `<span class="to">${message.to}</span>
      <span class="subject">${message.subject}</span>
      <span class="body">${message.body}</span>`;
    return li;
  }
};

module.exports = Sent;
