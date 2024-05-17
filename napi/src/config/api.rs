use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;

#[napi(constructor)]
pub struct Config;

#[napi]
impl Config {
  #[napi]
  pub fn get(&self) -> Vec<u8> {
    mystiko_lib::config::get().encode_to_vec()
  }

  #[napi]
  pub fn find_default_circuit(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_default_circuit::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_circuit(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_circuit::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_chain(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_chain::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_peer_chains(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_peer_chains::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_asset_symbols(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_asset_symbols::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_bridge(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_bridge::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_bridges(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_bridges::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_deposit_contract(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_deposit_contract::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_deposit_contract_by_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_deposit_contract_by_address::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_pool_contract(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_pool_contract::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_pool_contracts(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_pool_contracts::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_pool_contract_by_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_pool_contract_by_address::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn find_contract_by_address(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::find_contract_by_address::<&[u8]>(request.as_ref()).encode_to_vec()
  }

  #[napi]
  pub fn get_transaction_url(&self, request: Buffer) -> Vec<u8> {
    mystiko_lib::config::get_transaction_url::<&[u8]>(request.as_ref()).encode_to_vec()
  }
}
