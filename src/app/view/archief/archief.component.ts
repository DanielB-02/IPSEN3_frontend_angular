import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-archief',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './archief.component.html',
  styleUrl: './archief.component.scss'
})
export class ArchiefComponent {
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
        next: (updated) => {
          console.log('Platform status updated', updated);
        },
        error: (err) => {
          console.error('Error updating platform status', err);
        }
      });
    } else {
      console.log('Archiving cancelled');
    }
  }
}
