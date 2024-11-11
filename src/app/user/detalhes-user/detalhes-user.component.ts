import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-detalhes-user',
  standalone: true,
  imports: [],
  templateUrl: './detalhes-user.component.html',
  styleUrl: './detalhes-user.component.scss'
})
export class DetalhesUserComponent implements OnInit {


  userId:string | null = null;



  constructor(private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.userId=this.route.snapshot.paramMap.get('id');
  }
}
