#![deny(clippy::all)]

#[macro_use]
extern crate napi_derive;


#[napi]
fn get_random_number_range(min: i32, max: i32) -> i32 {
  use rand;
  min + (max - min) * rand::random::<f32>() as i32
}