import { Component, OnInit, Input, HostBinding, ViewChild } from '@angular/core';

import { MangolLayer, MangolLayergroup } from './../../core/_index';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'mangol-layergroup',
  templateUrl: './layergroup.component.html'
})
export class MangolLayergroupComponent implements OnInit {
  @HostBinding('class') class = 'mangol-layergroup';
  @ViewChild('start') sidenav: MatSidenav;

  @Input() layerGroup: MangolLayergroup;

  expanded: boolean;
  children: any[];
  nestedLayers: MangolLayer[];
  nestedLayerGroups: MangolLayergroup[];
  fontIcon: string;
  detailsVisible: boolean;
  detailsHeight: string;
  childrenVisible: boolean;

  constructor() {
    this.children = [];
    this.nestedLayers = [];
    this.nestedLayerGroups = [];
    this.detailsVisible = false;
    this.detailsHeight = '100%';
  }

  public ngOnInit(): any {
    this.expanded = this.layerGroup.getExpanded();
    this.fontIcon = this.expanded ? 'ms-directory-open' : 'ms-directory';
    this.children = this.layerGroup.getChildren();
    this.childrenVisible = true;
    for (let i = 0; i < this.children.length; i++) {
      const children = this.children[i];
      if (children instanceof MangolLayer) {
        this.nestedLayers.push(children);
      } else if (children instanceof MangolLayergroup) {
        this.nestedLayerGroups.push(children);
      }
    }
  }

  /**Expands or closes the layergroup */
  public toggleExpanded(): void {
    this.expanded = !this.expanded;
    this.fontIcon = this.expanded ? 'ms-directory-open' : 'ms-directory';
  }

  public showDetails(): void {
    this.sidenav.open();
  }

  public hideDetails(): void {
    this.sidenav.close();
  }

  public onDetailsElementClicked(obj: any) {
    switch (obj.type) {
      case 'expand':
        this.toggleExpanded();
        break;
      case 'visibility':
        this.childrenVisible = !this.childrenVisible;
        for (let i = 0; i < this.nestedLayers.length; i++) {
          this.nestedLayers[i].setVisible(this.childrenVisible);
        }
        for (let i = 0; i < this.nestedLayerGroups.length; i++) {
          // TODO
        }
        break;
    }
  }

}
