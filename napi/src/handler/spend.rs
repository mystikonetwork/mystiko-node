use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Spend;

#[napi]
impl Spend {
  #[napi]
  pub fn quote(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::quote::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn summary(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::summary::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn create(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::create::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn send(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::send::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn send_with_grpc(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::send_with_grpc::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn find(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::find::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn find_all(&self) -> Buffer {
    let r = mystiko_lib::handler::spend::find_all().encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn find_one(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::find_one::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn find_by_id(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::find_by_id::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn count(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::find_by_id::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn count_all(&self) -> Buffer {
    let r = mystiko_lib::handler::spend::count_all().encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn update(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::update::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn update_by_filter(&self, request: Buffer) -> Buffer {
    let r =
      mystiko_lib::handler::spend::update_by_filter::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn update_batch(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::update_batch::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn update_all(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::update::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn delete(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::delete::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn delete_batch(&self, request: Buffer) -> Buffer {
    let r = mystiko_lib::handler::spend::delete_batch::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn delete_by_filter(&self, request: Buffer) -> Buffer {
    let r =
      mystiko_lib::handler::spend::delete_by_filter::<&[u8]>(request.as_ref()).encode_to_vec();
    Buffer::from(r)
  }

  #[napi]
  pub fn delete_all(&self) -> Buffer {
    let r = mystiko_lib::handler::spend::delete_all().encode_to_vec();
    Buffer::from(r)
  }
}
