import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.component.html',
  styleUrl: './cell.component.scss'
})
export class CellComponent {
  @Input() row!: number;
  @Input() cells!: string[];
  @Output() cellClick = new EventEmitter<{row:number, col:number}>();

  onCellClick(col:number){
    this.cellClick.emit({row: this.row, col});
  }
}
