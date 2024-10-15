import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-status.component.html',
  styleUrl: './game-status.component.scss'
})
export class GameStatusComponent {
  @Input() currentPlayer!: string;
  @Input() winner!: string | null;
}
