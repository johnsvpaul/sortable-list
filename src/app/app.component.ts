import { Component, AfterViewInit, AfterViewChecked, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  mainList = ['Item 1', 'Item 2', 'Item 5'];
  groups: any[] = [
    { title: 'Group 1', items: ['Item 3', 'Item 4'] },
  ];

  @ViewChild('mainContainer') mainContainerRef!: ElementRef;
  @ViewChildren('groupContainer') groupContainerRefs!: QueryList<ElementRef>;

  initializedContainers = 0;

  ngAfterViewInit() {
    this.initSortable(this.mainContainerRef.nativeElement, 'main', ['nested']);
  }

  ngAfterViewChecked() {
    this.groupContainerRefs.forEach((groupContainerRef, index) => {
      if (index >= this.initializedContainers) {
        this.initSortable(groupContainerRef.nativeElement, 'nested', ['nested', 'main']);
        this.initializedContainers++;
      }
    });
  }

  initSortable(el: HTMLElement, groupName: string, put: string[]): void {
    new Sortable(el, {
      group: {
        name: groupName,
        put: put
      },
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65
    });
  }

  addItem() {
    this.mainList.push(`Item ${this.mainList.length + 1}`);
  }

  addGroup() {
    this.groups.push({
      title: `Group ${this.groups.length + 1}`,
      items: []
    });
  }
}
