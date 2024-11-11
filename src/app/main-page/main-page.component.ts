import { Component, OnInit } from '@angular/core';
import { LojaService } from '../services/loja.service';
import { CommonModule } from '@angular/common';
import { Game } from '../models/game' 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  gamesList: Game[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private lojaService: LojaService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.lojaService.getGamesList().subscribe({
      next: (data) => {
        this.gamesList = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar a lista de jogos';
        this.loading = false;
      }
    });
  }
}
