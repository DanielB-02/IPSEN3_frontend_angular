import {Component, OnInit} from '@angular/core';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";
import {UserStorageService} from "../../auth/user-storage.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent implements OnInit {
  platforms: Platform[];
  isReadonly: boolean = false;
  isNotReadOnlyOrFicter= false;

  constructor(private platformService: PlatformService,
              private userStorageService: UserStorageService) {
  }

  ngOnInit() {
    this.platformService.platforms$.subscribe(data => {
      this.platforms = data.filter(platform => platform.status !== true);
    });
    this.isNotReadOnlyOrFicter = this.userStorageService.isReadonlyOrFicter();
  }
  setPlatformStatusFalse(platform: Platform): void {
    const isConfirmed = confirm(`Are you sure you want to archive the platform: ${platform.platformName}?`);
    if (isConfirmed) {
      const updatedPlatform = {
        ...platform,
        status: true
      };
      this.platformService.updatePlatform(platform.id, updatedPlatform).subscribe({
        error: (err) => {
          console.error('Error updating platform status', err);
        }
      });
    }
  }
}
