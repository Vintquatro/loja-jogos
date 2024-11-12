import { Component, OnInit } from '@angular/core';
import { LojaService } from '../services/loja.service';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game' 
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  gamesList: Game[] = [];
  filteredGames: Game[] = [];
  loading: boolean = true;
  error: string = '';
  searchQuery: string = '';

  constructor(private lojaService: LojaService) { }

  ngOnInit(): void {
    this.lojaService.getGamesList().subscribe({
      next: (data) => {
        this.gamesList = data;
        this.filteredGames = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error loading the list of games.';
        this.loading = false;
      }
    });
  }

  filterGames(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredGames = this.gamesList; 
    } else {
      this.filteredGames = this.gamesList.filter(game =>
        game.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        game.genre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        game.platform.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}