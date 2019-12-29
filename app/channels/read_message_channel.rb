class ReadMessageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "my_messages:#{current_user.id}"
  end

  def unsubscribed
  end

  def read(data)
    message = Message.find_by(id: data['message_id'])
    message.read! if message.present?
  end
end
