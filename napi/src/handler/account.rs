use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Account;

#[napi]
impl Account {
  #[napi]
  pub fn create(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::create::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn count(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::count::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn count_all(&self) -> Buffer {
    mystiko_lib::handler::account::count_all()
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn find(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::find::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn find_by_identifier(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::find_by_identifier::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn update(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::update::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn update_encryption(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::update_encryption::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn export_secret_key(&self, request: Buffer) -> Buffer {
    mystiko_lib::handler::account::export_secret_key::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }
}
