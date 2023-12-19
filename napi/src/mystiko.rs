use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Mystiko;

#[napi]
impl Mystiko {
  #[napi]
  pub fn initialize(&self, request: Buffer) -> Buffer {
    mystiko_lib::initialize::<&[u8]>(request.as_ref())
      .encode_to_vec()
      .into()
  }

  #[napi]
  pub fn is_initialized() -> bool {
    mystiko_lib::is_initialized()
  }

  #[napi]
  pub fn destroy() {
    mystiko_lib::destroy()
  }
}
