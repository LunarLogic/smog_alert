class ContactFormValidator
  def call(input)
    feedback = []
    feedback << "sender_name is empty" if input[:sender_name].empty? 
    feedback << "message is empty" if input[:message].empty?  
    feedback << "sender_email empty" if input[:sender_email].empty? 
    feedback << "sender_email invalid format" unless input[:sender_email].include?("@")
    feedback
  end
end