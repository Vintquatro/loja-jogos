import { Component, OnInit } from '@angular/core';
import { LojaService } from '../../services/loja.service';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RouterModule } from '@angular/router';  // Import RouterModule for routing

@Component({
  selector: 'app-gamelist',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Add CommonModule here
  templateUrl: './gamelist.component.html',
  styleUrls: ['./gamelist.component.scss']
})
export class GamelistComponent implements OnInit {
  userProfile: any = {}; 

  constructor(private lojaService: LojaService) {}

  ngOnInit(): void {
    // Fetch the user profile, including the lists and games
    this.lojaService.getProfile().subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  // Remove a game from the list
  removeGame(gameId: string, list: any): void {
    list.gamesIds = list.gamesIds.filter((id: string) => id !== gameId);
    this.updateProfile(); // Update profile after removing the game
  }

  // Move a game to another list
  moveToAnotherList(gameId: string, currentList: any): void {
    // Prompt user to select another list (you can use a modal or dropdown here)
    const newListId = prompt('Enter the list ID to move the game to:');

    if (newListId && this.userProfile.lists.find((list: any) => list.id === newListId)) {
      // Remove game from current list
      currentList.gamesIds = currentList.gamesIds.filter((id: string) => id !== gameId);
      
      // Add game to the new list
      const newList = this.userProfile.lists.find((list: any) => list.id === newListId);
      newList.gamesIds.push(gameId);
      
      this.updateProfile(); // Update profile after moving the game
    } else {
      alert('Invalid list ID!');
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
}
