import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from '../../services/loja.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  userId: string = '';
  userProfile: any = {};  

  constructor(
    private route: ActivatedRoute,
    private lojaService: LojaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';

   
    this.lojaService.getProfile().subscribe(
      (data) => {
        if (data.id === this.userId) {
          this.userProfile = { ...data };  
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSave(): void {

    this.lojaService.updateProfile(this.userProfile).subscribe(
      (updatedData) => {
        console.log('Profile updated successfully', updatedData);
        this.router.navigate([`/detalhes-user/${this.userProfile.id}`]);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );
  }



  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
  }
  
  getBackgroundColor(name: string): string {
    // Generate a color based on the user's name or use a default color
    return '#007bff'; // Or any color logic you'd prefer
  }
  
}

