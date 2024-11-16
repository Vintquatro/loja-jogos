import { Component, OnInit } from '@angular/core';
import { LojaService } from '../../services/loja.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Game } from '../../models/game';

@Component({
  selector: 'app-gamelist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss']
})
export class GamelistComponent implements OnInit {
  userProfile: any = {}; 
  gamesList: Game[] = []; 
  gamesMap: { [key: string]: Game } = {};

  pendingMove: { gameId: string, targetListId: string } | null = null;

  constructor(private lojaService: LojaService) {}

  ngOnInit(): void {
    this.lojaService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    this.lojaService.getGamesList().subscribe(
      (games) => {
        this.gamesList = games;
        this.gamesMap = games.reduce((map, game: Game) => {
          map[game.id] = game;
          return map;
        }, {} as { [key: string]: Game });
      },
      (error) => {
        console.error('Error fetching games list:', error);
      }
    );
  }

  removeGame(gameId: string, list: any): void {
    list.gamesIds = list.gamesIds.filter((id: string) => id !== gameId);
    this.updateProfile();
  }

  onListChange(gameId: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const targetListId = selectElement.value;

    this.pendingMove = { gameId, targetListId };
  }

  confirmMove(gameId: string): void {
    if (this.pendingMove) {
      const { targetListId } = this.pendingMove;
      const targetList = this.userProfile.lists.find((list: any) => list.id === targetListId);
      const currentList = this.userProfile.lists.find((list: any) => list.gamesIds.includes(gameId));

      if (targetList && currentList) {
        currentList.gamesIds = currentList.gamesIds.filter((id: string) => id !== gameId);
        targetList.gamesIds.push(gameId);
        
        this.pendingMove = null;
        this.updateProfile();
      }
    }
  }

  updateProfile(): void {
    this.lojaService.updateProfile(this.userProfile).subscribe(
      (updatedData) => {
        console.log('Profile updated successfully', updatedData);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  getGameDetails(gameId: string): Game | undefined {
    return this.gamesMap[gameId];
  }

  isPendingMove(gameId: string): boolean {
    return this.pendingMove?.gameId === gameId;
  }
}
