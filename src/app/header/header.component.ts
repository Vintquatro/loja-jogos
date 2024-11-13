import { Component, OnInit } from '@angular/core';
import { LojaService } from '../services/loja.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userProfile$: Observable<any> | undefined;  

  constructor(private lojaService: LojaService) {}

  ngOnInit(): void {
    this.userProfile$ = this.lojaService.getProfile(); 
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
