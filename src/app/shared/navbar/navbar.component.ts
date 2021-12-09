import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  darkTheme: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.getActualTheme();
  }
  getActualTheme() {
    this.darkTheme = JSON.parse(localStorage.getItem('DARKTHEME') || 'false');
  }
  changeTheme() {
    localStorage.setItem('DARKTHEME', this.darkTheme ? 'false' : 'true');
    if (!this.darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    this.getActualTheme();
  }
}
