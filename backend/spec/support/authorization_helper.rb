module AuthorizationHelper
  def authorization_stub
    allow_any_instance_of(SecuredController).to receive(:authorize_request).and_return(current_user)
    allow_any_instance_of(SecuredController).to receive(:current_user).and_return(current_user)
  end
end
