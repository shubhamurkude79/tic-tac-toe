import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  board!: string[][];
  currentPlayer!: string;
  winner!: string | null;
  moveCount!: number;
  winningCells: number[][] | null = null;  // To track winning cells

  constructor(){
    this.newGame();
  }

  newGame(){
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.winner = null;
    this.moveCount = 0;
  }

  makeMove(row:number, col:number){
    if(!this.board[row][col] && !this.winner){
      this.board[row][col] = this.currentPlayer;
      this.moveCount++;

      if(this.checkWinner()){
        this.winner = this.currentPlayer;
      } else if (this.moveCount === 9){
        this.winner = 'Draw';
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? '0' : 'X';
      }
    }
  }

  checkWinner():boolean{
    const winPatterns = [
      // Rows
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      // Columns
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      // Diagonals
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        this.board[a[0]][a[1]] &&
        this.board[a[0]][a[1]] === this.board[b[0]][b[1]] &&
        this.board[a[0]][a[1]] === this.board[c[0]][c[1]]
      ) {
        this.winningCells = pattern;  // Store the winning pattern
        return true;
      }
    }

    return false;
  }

  isWinningCell(row: number, col: number): boolean {
    return this.winningCells?.some(([r, c]) => r === row && c === col) ?? false;
  }
  
  isHorizontalWin(): boolean {
    return this.winningCells?.[0][0] === this.winningCells?.[1][0] &&
           this.winningCells?.[1][0] === this.winningCells?.[2][0];
  }
  
  isVerticalWin(): boolean {
    return this.winningCells?.[0][1] === this.winningCells?.[1][1] &&
           this.winningCells?.[1][1] === this.winningCells?.[2][1];
  }
  
  isDiagonalLeftWin(): boolean {
    return this.winningCells?.[0][0] === 0 &&
           this.winningCells?.[1][1] === 1 &&
           this.winningCells?.[2][2] === 2;
  }
  
  isDiagonalRightWin(): boolean {
    return this.winningCells?.[0][0] === 0 &&
           this.winningCells?.[1][1] === 1 &&
           this.winningCells?.[2][0] === 2;
  }

}
