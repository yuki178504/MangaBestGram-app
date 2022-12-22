class AddEMailToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :e_mail, :string
  end
end
