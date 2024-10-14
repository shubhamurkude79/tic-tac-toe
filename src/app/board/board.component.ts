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

  constructor(){
    this.newGame();
  }

  newGame(){
    this.board = Array(3).fill(null).map(() => Array(3).fill(null));
    this.currentPlayer = 'X';
    this.winner = null;
    this.moveCount = 0;
  }

}
