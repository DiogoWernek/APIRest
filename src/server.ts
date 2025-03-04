import express from "express"

function sum(a:number, b:number):number {
  return a + b
}

const result: number = sum(5,7)
console.log("Resultado: ", result)