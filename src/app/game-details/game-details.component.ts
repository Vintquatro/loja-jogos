import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameDetails } from '../models/game-details.model';
import { LojaService } from '../services/loja.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  gameDetails: GameDetails | null = null;
  userProfile: any = {};
  currentListId: string | null = null;
  errorMessage: string | null = null;
  zoomedImage: string | null = null;
  isZoomed = false;
  constructor(
    private lojaService: LojaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (gameId) {
      this.fetchGameDetails(gameId);
    }

    this.lojaService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
        this.currentListId = this.getGameCurrentList(gameId);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  fetchGameDetails(id: string): void {
    this.lojaService.getGameDetails(id).subscribe({
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

  zoomImage(image: string): void {
    this.zoomedImage = image;
    this.isZoomed = true;
  }

  closeZoom(): void {
    this.isZoomed = false;
  }

  onListChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const targetListId = selectElement.value;

    if (targetListId === this.currentListId)
      return;

    this.moveGameToList(targetListId);
  }

  moveGameToList(targetListId: string): void {
    if (this.gameDetails) {
      const targetList = this.userProfile.lists.find((list: any) => list.id === targetListId);
      const currentList = this.userProfile.lists.find((list: any) => list.id === this.currentListId);

      if (targetList && currentList) {
        currentList.gamesIds = currentList.gamesIds.filter((id: string) => id !== this.gameDetails?.id);
        targetList.gamesIds.push(this.gameDetails.id);

        this.updateProfile();
        this.currentListId = targetListId;
      }
    }
  }

  updateProfile(): void {
    this.lojaService.updateProfile(this.userProfile).subscribe(
      (updatedData) => {
        console.log('Profile updated successfully:', updatedData);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }

  getGameCurrentList(gameId: string | null): string | null {
    if (!gameId || !this.userProfile?.lists) return null;
    const list = this.userProfile.lists.find((list: any) => list.gamesIds.includes(gameId));
    return list ? list.id : null;
  }
}
