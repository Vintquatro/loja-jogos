import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from '../models/game-details.model';
import { LojaService } from '../services/loja.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';  // Import 'of' to handle errors

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameDetails: GameDetails | null = null;
  errorMessage: string | null = null;

  constructor(
    private gameService: LojaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.fetchGameDetails(gameId);
    }
  }

  fetchGameDetails(id: string): void {
    this.gameService.getGameDetails(id).subscribe({
      next: (data) => {
        this.gameDetails = data;
        this.errorMessage = null;
      },
      error: () => {
        this.gameDetails = null;
        this.errorMessage = 'Game not found. Please check the game ID and try again.';
      }
    });
  }
}
