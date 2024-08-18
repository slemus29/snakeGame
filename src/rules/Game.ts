import Food from "./Food";
import Snake, { SnakeDirection } from "./Snake";

export interface Point {
    x: number
    y: number
}

export interface Edges {
    upperLeft: Point
    lowerRight: Point
}

export enum Cell {
    FOOD,
    HEAD,
    TAIL,
    EMPTY,
    SHRINK,
}


export default class Game {
    public snake:Snake;
    public food:Food;
    public gameOver = false;
    public score = 0;
    public edges: Edges;

    static SPECIAL_FOOD_SCORE = 9;
    static FOOD_SCORE = 1;
    static SHRINK_FACTOR = 5;

    constructor(
        public readonly width: number,
        public readonly height: number,
    ) {
        this.snake = new Snake(Math.floor(this.width/2), Math.floor(this.height/2))
        this.food = new Food(30, 25)
        this.edges = {
            upperLeft: { x: 0, y: 0},
            lowerRight: { x: this.width - 1, y: this.height - 1}
        }

    }

    move() {
        const next = this.snake.nextPosition()
        if(!this.insideEdges(next)) {
            this.shinkBoard(this.snake.direction)
            this.snake.bump()
            console.log(this.snake.direction)
            return
        }
        this.snake.move()
        if(!this.snake.isAlive()){
            this.gameOver = true
        } else {
            if(this.food.isEaten(this.snake.head)) {
                this.score += Game.FOOD_SCORE
                this.food = Food.randomPositionFood(this.edges, [...this.snake.tail, this.snake.head])
                this.snake.grow()
            }
        }
    }

    insideEdges(point: Point) {
        return point.x <= this.edges.lowerRight.x && point.x >= this.edges.upperLeft.x && 
               point.y <= this.edges.lowerRight.y && point.y >= this.edges.upperLeft.y  
    }

    direct(direction: SnakeDirection) {
        this.snake.changeDirectionAttempt(direction)
    }

    board() {
        const b: Array<Array<Cell>> = []
        for(let i=0; i < this.height; i++) {
            const row = []
            for(let j=0; j< this.width; j++) {
                row.push(this.insideEdges({x: j, y: i}) ? Cell.EMPTY : Cell.SHRINK)
            } 
            b.push(row)
        }
        b[this.food.position.y][this.food.position.x] = Cell.FOOD
        this.snake.tail.forEach(({x, y}) => {
            b[y][x] = Cell.TAIL
        })
       
        b[this.snake.head.y][this.snake.head.x] = Cell.HEAD
        return b
    }

    shinkBoard (snakeDirection: SnakeDirection) {
        if(snakeDirection === SnakeDirection.UP) {
            this.edges.lowerRight.y -= Game.SHRINK_FACTOR
        }
        if(snakeDirection === SnakeDirection.DOWN) {
            this.edges.upperLeft.y += Game.SHRINK_FACTOR
        }
        if(snakeDirection === SnakeDirection.RIGHT) {
            this.edges.upperLeft.x += Game.SHRINK_FACTOR
        }
        if(snakeDirection === SnakeDirection.LEFT) {
            this.edges.lowerRight.x -= Game.SHRINK_FACTOR
        }
        if(this.edges.lowerRight.x < this.edges.upperLeft.x || this.edges.lowerRight.y < this.edges.upperLeft.y) {
            this.gameOver = true
        }
    }
}