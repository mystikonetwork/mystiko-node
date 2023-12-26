use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Synchronizer;

#[napi]
impl Synchronizer {
  #[napi]
  pub fn chain_synced_block(&self, request: Buffer) -> Buffer {
    mystiko_lib::synchronizer::chain_synced_block::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn contract_synced_block(&self, request: Buffer) -> Buffer {
    mystiko_lib::synchronizer::contract_synced_block::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn status(&self, request: Buffer) -> Buffer {
    mystiko_lib::synchronizer::status::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn sync(&self, request: Buffer) -> Buffer {
    mystiko_lib::synchronizer::sync::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn reset(&self, request: Buffer) -> Buffer {
    mystiko_lib::synchronizer::reset::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }
}
