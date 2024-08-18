import { Point } from "./Game";

export enum SnakeDirection {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT'
}

export default class Snake {
    alive = true;
    direction = SnakeDirection.RIGHT;
    changeDirection: SnakeDirection | undefined
    tail: Array<Point> = []
    head: Point

    static GROW_SIZE = 1    ;

    constructor(
        public readonly x: number,
        public readonly y: number,
    ) {
        this.head = {x, y}
    }

    tailCopy() {
        return this.tail.map((p) => ({...p}))
    }

    nextPosition() {
        let newHead: Point = { x: 0, y: 0}
        switch (this.direction) {
            case SnakeDirection.UP:
                newHead = { x: this.head.x, y: this.head.y - 1}
                break
            case SnakeDirection.DOWN:
                newHead = { x: this.head.x, y: this.head.y + 1}
                break
            case SnakeDirection.LEFT:
                newHead = { x: this.head.x - 1, y: this.head.y}
                break
            case SnakeDirection.RIGHT:
                newHead = { x: this.head.x + 1, y: this.head.y}
                break
        }
        return newHead
    }

    updateAlive () {
        this.alive = !this.tail.some(({x,y}) => this.head.x === x && this.head.y === y)
    }

    updateDirection() {
        if(this.changeDirection) {
            if(
                (this.changeDirection === SnakeDirection.LEFT && this.direction !== SnakeDirection.RIGHT) ||
                (this.changeDirection === SnakeDirection.RIGHT && this.direction !== SnakeDirection.LEFT) ||
                (this.changeDirection === SnakeDirection.UP && this.direction !== SnakeDirection.DOWN) ||
                (this.changeDirection === SnakeDirection.DOWN && this.direction !== SnakeDirection.UP) 
            ){
                this.direction = this.changeDirection
            }
        }

        this.changeDirection = undefined
    }

    move() {
        // 
        this.updateDirection()
        const newHead = this.nextPosition()

        const newTail = []

        for(let i = 0; i < this.tail.length ; i++) {
            if(i === 0) {
                newTail.push({...this.head})
            } else {
                newTail.push({...this.tail[i-1]})
            }
        }

        this.head = newHead
        this.tail = newTail

        this.updateAlive()
    }

    bump() {
        console.log();
        
        if(this.direction === SnakeDirection.UP) {
            this.direction = SnakeDirection.LEFT
        }
        else if(this.direction === SnakeDirection.LEFT) {
            this.direction = SnakeDirection.DOWN
        }else if(this.direction === SnakeDirection.DOWN) {
            this.direction = SnakeDirection.RIGHT
        }else if(this.direction === SnakeDirection.RIGHT) {
            this.direction = SnakeDirection.UP
        }
    }

    changeDirectionAttempt (newDirection: SnakeDirection) {
        this.changeDirection = newDirection
    }

    isAlive() {
        return this.alive
    }

    grow() {
        let growPosition = this.head
        if(this.tail.length > 0) {
            growPosition = this.tail[this.tail.length - 1]
        }
        for(let i = 0; i < Snake.GROW_SIZE ; i++) {
            this.tail.push({...growPosition})
        }
    }

}