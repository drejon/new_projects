import { useState } from "react";

export function ShotCounter({ counter }) {
  return (
    <aside>
      <header>
        <h2>Shots Fired</h2>
        <h2>{counter}</h2>
      </header>
    </aside>
  )
}