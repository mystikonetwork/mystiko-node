use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Deposit;

#[napi]
impl Deposit {
  #[napi]
  pub fn quote(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::quote::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn summary(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::summary::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn create(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::create::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn send(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::send::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn send_with_grpc(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::send_with_grpc::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::find::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_all(&self) -> Vec<u8> {
    mystiko_lib::handler::deposit::find_all().encode_to_vec()
  }

  #[napi]
  pub fn find_one(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::find_one::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_by_id(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::find_by_id::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn count(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::count::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn count_all(&self) -> Vec<u8> {
    mystiko_lib::handler::deposit::count_all().encode_to_vec()
  }

  #[napi]
  pub fn update(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::update::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_batch(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::update_batch::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_by_filter(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::update_by_filter::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn update_all(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::update_all::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn delete(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::delete::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn delete_batch(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::delete_batch::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn delete_by_filter(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::handler::deposit::delete_by_filter::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn delete_all(&self) -> Vec<u8> {
    mystiko_lib::handler::deposit::delete_all().encode_to_vec()
  }
}
