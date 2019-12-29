import consumer from "./consumer"

const message = consumer.subscriptions.create("ReadMessageChannel", {
  connected() {
    console.log('Connected at ReadMessageChannel')
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    data['messages'].forEach(message_id => {
      let container = document.querySelector(`div.message[data-message-id="${message_id}"] .details .read-icon`);
      container.classList.add('has-text-success')
    })
  },

  read(message_id) {
    this.perform('read', {message_id: message_id})
  }
});

export default message
