#Authorization HTTP Headerに含まれるアクセストークンを取得しJWTに渡して検証するためのクラス
class AuthorizationService
  def initialize(headers = {})
    @headers = headers
  end

  #ユーザーモデルメソッドを実行し、ユーザー情報を返すメソッド
  def current_user
    #@auth_payloadにverify_tokenを代入している。@auth_headerはnilになる。
    @auth_payload, @auth_header = verify_token
    #@userに
    @user = User.from_token_payload(@auth_payload)
  end

  private

  def http_token
    @headers['Authorization'].split(' ').last if @headers['Authorization'].present?
  end

  #JsonWebTokenを実行して、tokenを渡す
  def verify_token
    JsonWebToken.verify(http_token)
  end
end
