import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.checkDarkMode();
  }
  checkDarkMode() {
    const darkMode = JSON.parse(localStorage.getItem('DARKTHEME') || 'false');
    console.log(darkMode, 'darkMode');
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      const prefersDark = window.matchMedia('prefers-color-scheme: dark)');
      document.body.classList.toggle('dark-theme', prefersDark.matches);
    }
  }
  title = 'gorila';
}
