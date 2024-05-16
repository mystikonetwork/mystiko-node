use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Scanner;

#[napi]
impl Scanner {
  #[napi]
  pub fn scan(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::scanner::scan::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn reset(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::scanner::reset::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn balance(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::scanner::balance::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn assets(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::scanner::assets::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn chain_assets(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::scanner::chain_assets::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }
}
