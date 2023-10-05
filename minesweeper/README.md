# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


```js
  class Position {
    constructor(x, y){
      this.x = x
      this.y = y
    }

    isEqual(position) {
      return this.x === position.x && this.y === position.y
    }
  }

  positions = [position, position, position, position]
  // Quiero saber si una de las posiciones ya tiene esta coordenada
  // Dada la coordenada x = 1, y = 1
  targetPosition = new Position(1, 1)
  positions.find((position) => {
    return position.isEqual(targetPosition)
  })
```

