use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Wallet;

#[napi]
impl Wallet {
  #[napi]
  pub fn create(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::wallet::create::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn check_current(&self) -> Vec<u8> {
    mystiko_lib::handler::wallet::check_current().encode_to_vec()
  }

  #[napi]
  pub fn check_password(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::wallet::check_password::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_password(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::wallet::update_password::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn export_mnemonic_phrase(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::wallet::export_mnemonic_phrase::<&[u8]>(request.as_ref()).encode_to_vec()
  }
}
