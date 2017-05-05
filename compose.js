const MessageStore = require('./message_store.js');

const Compose = {
  render: () => {
    const messages = MessageStore.getInboxMessages();
    const div = document.createElement('div');
    div.className = 'new-messages';

    div.innerHTML = Compose.renderForm();

    return div;
  },

  renderForm: () => {
    const currentDraft = MessageStore.getMessageDraft();
    console.log(currentDraft);

    const htmlString = `
    <p class="new-message-header">New Message</p>
    <form class='compose-form'>
      <input placeholder="Recipient" name="to" type="text"
      value=${currentDraft.to}>
      <input placeholder="Subject" name="subject" type="text"
      value=${currentDraft.subject}>
      <textarea name="body" rows="20">${currentDraft.body}</textarea>
      <button type="submit" class="btn btn-primary
      submit-message">Send</button>
    </form>
      `;

    return htmlString;
  }
};

module.exports = Compose;
