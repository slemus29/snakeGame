import { Edges, Point } from "./Game";

export default class Food {
    position: Point
    constructor(
        public readonly x: number,
        public readonly y: number,
    ) {
        this.position = { x, y }
    }

    isEaten(snakeHead:Point) {
        return (snakeHead.x === this.position.x && snakeHead.y === this.position.y)
    }

    static randomPositionFood(edges: Edges, forbiden: Array<Point>) {
        let valid = false
        let x = 0
        let y = 0

        while(!valid) {
            x = Math.floor(Math.random() * (edges.lowerRight.x - edges.upperLeft.x) + edges.upperLeft.x)
            y = Math.floor(Math.random() * (edges.lowerRight.y - edges.upperLeft.y) + edges.upperLeft.y)
            valid = !forbiden.some(p => p.x === x && p.y === y)
        }

        return new Food(x, y)
    }
}