import consumer from "./consumer"
import messageReader from "./read_message_channel";

consumer.subscriptions.create("MessageChannel", {
  connected() {
    console.log("Conected at MessageChannel")
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let messageContainer = document.querySelector("div.message-container");
    messageContainer.innerHTML += data.render;
    messageContainer.scrollIntoView(false);
    setTimeout(function () {
      messageReader.read(data.message_id)
    }, 2000)
  }
});
