#![deny(clippy::all)]

use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use prost::Message;


// pub mod config;
// pub mod handler;
// pub mod mystiko;

#[napi(constructor)]
pub struct Test;
