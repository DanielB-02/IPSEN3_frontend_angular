import { Component } from '@angular/core';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  platformsAsc: Platform[];
  platformsDesc: Platform[];

  constructor(private platformService: PlatformService) {
  }

  ngOnInit() {
    this.platformService.findByScoreAsc().subscribe(data => {
      this.platformsAsc = data;
    });
    this.platformService.findByScoreDesc().subscribe(data => {
      this.platformsDesc = data;
    });
  }

}
