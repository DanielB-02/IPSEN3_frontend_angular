import { Component } from '@angular/core';
import {Platform} from "../../model/platform/platform";
import {PlatformService} from "../../services/platform.service";

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrl: './platform.component.scss'
})
export class PlatformComponent {
  platforms: Platform[];

  constructor(private platformService: PlatformService) {
  }

  ngOnInit() {
    this.platformService.findAll().subscribe(data => {
      this.platforms = data;
    });

  }
}
