import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AlienService } from './services/alien.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  nickname: string = environment.nickname;

  data$!: Observable<any[]>;

  constructor(private alienService: AlienService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.data$ = this.alienService.getData();
  }

  sendMessage(event: any) {
  if (event.key === 'Enter') {
    const inputElement = event.target as HTMLInputElement;
    const message = inputElement.value.trim();

    if (message !== '') {
      this.alienService.sendData(message).subscribe(() => {
        inputElement.value = ''; 
        this.cdr.detectChanges();
      });
    }
  }
}
}
