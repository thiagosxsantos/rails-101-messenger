class Message < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'
  validates :content, presence: true
  after_create :send_message

  def read!
    self.update(read: true)
    ReadMessageJob.perform_now(self.sender, [self.id])
  end

  def self.bulk_read_from(user)
    Message.where(id: user.sent.ids).update_all(read: true)
    ReadMessageJob.perform_now(user, [user.sent.ids])
  end

  private

  def send_message
    MessageSenderJob.perform_now(self)
  end
end
