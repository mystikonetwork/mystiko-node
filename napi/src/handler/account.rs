use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Account;

#[napi]
impl Account {
  #[napi]
  pub fn create(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::create::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn count(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::count::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn count_all(&self) -> Vec<u8> {
    mystiko_lib::handler::account::count_all().encode_to_vec()
  }

  #[napi]
  pub fn find(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::find::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_all(&self) -> Vec<u8> {
    mystiko_lib::handler::account::find_all().encode_to_vec()
  }

  #[napi]
  pub fn find_by_id(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::find_by_id::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_by_shielded_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::find_by_shielded_address::<&[u8]>(request.as_ref())
      .encode_to_vec()
  }

  #[napi]
  pub fn find_by_public_key(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::find_by_public_key::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_by_id(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::update_by_id::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_by_shielded_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::update_by_shielded_address::<&[u8]>(request.as_ref())
      .encode_to_vec()
  }

  #[napi]
  pub fn update_by_public_key(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::update_by_public_key::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_encryption(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::update_encryption::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn export_secret_key_by_id(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::export_secret_key_by_id::<&[u8]>(request.as_ref())
      .encode_to_vec()
  }

  #[napi]
  pub fn export_secret_key_by_shielded_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::export_secret_key_by_shielded_address::<&[u8]>(request.as_ref())
      .encode_to_vec()
  }

  #[napi]
  pub fn export_secret_key_by_public_key(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::account::export_secret_key_by_public_key::<&[u8]>(request.as_ref())
      .encode_to_vec()
  }
}
