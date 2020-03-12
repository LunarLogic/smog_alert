class ContactFormValidator
  def call(input)
    errors = Hash.new { |hash, key| errors[key] = [] }
    errors[:sender_name] <<  "sender_name is empty"  if input[:sender_name].empty? 
    errors[:message] <<  "message is empty" if input[:message].empty? 
    errors[:sender_email] << "sender_email is empty" if input[:sender_email].empty? 
    errors[:sender_email] << "sender_email has invalid format" unless input[:sender_email].include?("@")
    errors
  end
end