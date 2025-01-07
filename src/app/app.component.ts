import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {GoogleFonts} from "./global-data";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {SelectModule} from "primeng/select";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    FloatLabelModule,
    SelectModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  filteredFonts: any = [];
  loadedFonts: string[] = [];
  baseFont: any;

  ngOnInit(): void {
    this.baseFont = {name: 'ABeeZee'};
    this.filterFonts({filter: ""});
  }

  filterFonts(event: any): void {
    const query = event.filter.toLowerCase();
    this.filteredFonts = GoogleFonts
        .filter(fn => fn.toLowerCase().includes(query))
        .slice(0, 10)
        .map(fn => ({ name: fn }));
    this.filteredFonts.forEach((font: any) => this.loadFont(font.name));
  }

  loadFont(fontName: string): void {
    const fontFamily = fontName.replace(/ /g, '+');
    const encodedFont = btoa(fontName.toLowerCase());

    if (!this.loadedFonts.includes(encodedFont)) {
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = `https://fonts.googleapis.com/css?family=${fontFamily}:100,200,300,400,500,600,700,800,900`;
      document.head.appendChild(fontLink);

      this.loadedFonts.push(encodedFont);
    }
  }
}
