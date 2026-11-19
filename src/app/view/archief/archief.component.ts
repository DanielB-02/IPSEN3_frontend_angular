import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-archief',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './archief.component.html',
  styleUrl: './archief.component.scss'
})
export class ArchiefComponent implements OnInit {
  platforms: Platform[];

  constructor(private platformService: PlatformService) {
  }
  ngOnInit() {
    this.platformService.platforms$.subscribe(data => {
      this.platforms = data.filter(platform => platform.status !== false);
    });
  }
  setPlatformStatusFalse(platform: Platform): void {

    const isConfirmed = confirm(`Are you sure you want to restore the platform: ${platform.platformName}?`);
    if (isConfirmed) {
      const updatedPlatform = {
        ...platform,
        status: false
      };
      this.platformService.updatePlatform(platform.id, updatedPlatform).subscribe({
        error: (err) => {
          console.error('Error updating platform status', err);
        }
      });
    }
  }
}
