import { Component, OnInit } from '@angular/core';
import { LojaService } from '../../services/loja.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RouterModule } from '@angular/router';  // Import RouterModule for routing
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
  gamesMap: { [key: string]: Game } = {}; // Map for fast lookup with Game type

  // Store the pending move for confirmation
  pendingMove: { gameId: string, targetListId: string } | null = null;

  constructor(private lojaService: LojaService) {}

  ngOnInit(): void {
    // Fetch the user profile, including the lists and games
    this.lojaService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );

    // Fetch all games and create a lookup map with Game type
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

  // Remove a game from the list
  removeGame(gameId: string, list: any): void {
    list.gamesIds = list.gamesIds.filter((id: string) => id !== gameId);
    this.updateProfile(); // Update profile after removing the game
  }

  // Track the selected game for moving
  onListChange(gameId: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const targetListId = selectElement.value;

    // Set the pending move
    this.pendingMove = { gameId, targetListId };
  }

  // Confirm the move action
  confirmMove(gameId: string): void {
    if (this.pendingMove) {
      const { targetListId } = this.pendingMove;
      const targetList = this.userProfile.lists.find((list: any) => list.id === targetListId);
      const currentList = this.userProfile.lists.find((list: any) => list.gamesIds.includes(gameId));

      if (targetList && currentList) {
        // Remove game from the current list
        currentList.gamesIds = currentList.gamesIds.filter((id: string) => id !== gameId);
        // Add game to the target list
        targetList.gamesIds.push(gameId);
        
        // Clear pending move and update the profile
        this.pendingMove = null;
        this.updateProfile();
      }
    }
  }

  // Update the user's profile after any changes
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

  // Retrieve game details from the map by ID
  getGameDetails(gameId: string): Game | undefined {
    return this.gamesMap[gameId];
  }

  // Check if the game is pending a move
  isPendingMove(gameId: string): boolean {
    return this.pendingMove?.gameId === gameId;
  }
}
