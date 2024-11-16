import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LojaService } from '../../services/loja.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhes-user.component.html',
  styleUrls: ['./detalhes-user.component.scss'],
})
export class DetalhesUserComponent implements OnInit {
  userId: string = '';
  userProfile: any;
  showPassword: boolean = false;

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
          this.userProfile = data;
        }
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  editProfile() {
    this.router.navigate([`/edit-profile/${this.userProfile.id}`]);
  }


  getInitials(name: string): string {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part[0]).join('');
    return initials.toUpperCase();
  }
  
  getBackgroundColor(name: string): string {
    return '#007bff';
  }
  
}

