import { AfterViewInit, Component } from '@angular/core';
import Sortable from 'sortablejs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isAdding = false;
  inputs = [
    {
      definition: {
        id: 'pkwe2',
        address: null,
        title: 'Input Group',
        type: 'Object',
      },
      children: [
        {
          id: '9aaba2c2-0209-4d53-beb2-bad41974192f',
          address: 'Sheet1-C4:C5',
          name: 'M/F',
          default: 'M',
          maxItems: null,
          format: null,
          required: false,
          title: 'F',
          type: 'String',
          transpose: false,
          msoFormat: 'General',
          options: null,
          order: 5,
        },
        {
          id: '2660ab20-3bb3-4399-8b25-9315b8597276',
          address: 'Sheet1-D4:D5',
          name: 'M/Age',
          default: 58,
          maxItems: null,
          format: null,
          required: false,
          title: 'Age',
          type: 'Number',
          transpose: false,
          msoFormat: 'General',
          options: null,
          order: 6,
        },
      ],
      type: 2,
    },
    {
      definition: {
        id: '4aa8757c-0cf7-446b-b121-e12f841f10c3',
        address: 'Sheet1-B2',
        name: 'Executive001',
        title: 'Executive001',
        type: 'String',
        default: 'NS',
        required: false,
        format: null,
        originalType: 'String',
        options: null,
        transpose: false,
        msoFormat: 'General',
        order: 0,
      },
      type: 0,
      children: [],
    },
    {
      definition: {
        id: 'eff11f4d-e179-4f90-85dd-04fa0058d00f',
        address: 'Sheet1-B3',
        name: 'Executive002',
        title: 'Executive002',
        type: 'String',
        default: 'SM',
        required: false,
        format: null,
        originalType: 'String',
        options: null,
        transpose: false,
        msoFormat: 'General',
        order: 1,
      },
      type: 0,
      children: [],
    },
    {
      definition: {
        id: 'fff8b6d3-8826-47c0-b73c-8cbb474d2013',
        address: 'Sheet1-B4',
        name: 'Executive003',
        title: 'Executive003',
        type: 'String',
        default: 'SM',
        required: false,
        format: null,
        originalType: 'String',
        options: null,
        transpose: false,
        msoFormat: 'General',
        order: 2,
      },
      type: 0,
      children: [],
    },

    {
      definition: {
        id: '6ae3585c-a360-42e6-8c95-2ba022f28e02',
        address: 'Sheet1-C4:D5',
        name: 'M',
        format: null,
        required: false,
        title: 'M',
        type: 'List',
        matrix: false,
        transpose: false,
        maxItems: 2,
        default: null,
        ignoredColumns: [],
        order: 4,
      },
      type: 4,
      children: [
        {
          id: '9aaba2c2-0209-4d53-beb2-bad41974192f',
          address: 'Sheet1-C4:C5',
          name: 'M/F',
          default: 'M',
          maxItems: null,
          format: null,
          required: false,
          title: 'F',
          type: 'String',
          transpose: false,
          msoFormat: 'General',
          options: null,
          order: 5,
        },
        {
          id: '2660ab20-3bb3-4399-8b25-9315b8597276',
          address: 'Sheet1-D4:D5',
          name: 'M/Age',
          default: 58,
          maxItems: null,
          format: null,
          required: false,
          title: 'Age',
          type: 'Number',
          transpose: false,
          msoFormat: 'General',
          options: null,
          order: 6,
        },
      ],
    },
  ];


  ngAfterViewInit() {
    this.executeSortable();
  }

  // call sortables
  executeSortable(destroy?: boolean): void {
    const mainContainer =
      document.querySelector<HTMLElement>('.main-container');
    const groupContainers =
      document.querySelectorAll<HTMLElement>('.group-item');
    if (mainContainer) {
      if (!destroy) {
        this.initSortable(mainContainer, 'main', ['nested']);
        groupContainers.forEach((groupContainer) => {
          this.initSortable(groupContainer, 'nested', ['nested', 'main']);
        });
      } else {
        this.destroySortable(mainContainer);
        groupContainers.forEach((groupContainer) => {
          this.destroySortable(groupContainer);
        });
      }
    }
  }

  initSortable(el: HTMLElement, groupName: string, put: string[]): void {
    new Sortable(el, {
      group: {
        name: groupName,
        put: put,
      },
      // filter: 'is-object', // not allowed to sort table items
      animation: 150,
      fallbackOnBody: true,
      swapThreshold: 0.65,
      filter: (event, target, sortable) => {
        // console.log(event, target.className, sortable.el);
        return false;
      },
      onMove: (event, originalEvent) => {
        // console.log(event.dragged.classList, event.to.classList);
        if (
          (event.dragged.classList.contains('is-table-list') ||
            event.dragged.classList.contains('is-group-list')) &&
          event.to.classList.contains('group-item')
        ) {
          return false;
        } else {
          return true;
        }
        // console.log(evt, originalEvent);
      },
      onEnd: (event) => {
        // console.log(event.to.classList, event.from.classList);
      },
    });
  }

  /* 
  Description: Destroy sortable
  */
  destroySortable(el: HTMLElement): void {
    const sortableInstance = Sortable.get(el);
    if (sortableInstance) {
      sortableInstance.destroy();
    }
  }

  // temprary function
  randomId = () => Math.random().toString(36).substr(2, 9);

  // temprary function
  addItem() {
    this.inputs.push({
      definition: {
        id: this.randomId(),
        address: 'Sheet1-B5',
        name: 'Executive004',
        title: `Item ${this.inputs.length + 1}`,
        type: 'String',
        default: 'NT',
        required: false,
        format: null,
        originalType: 'String',
        options: null,
        transpose: false,
        msoFormat: 'General',
        order: 3,
      },
      type: 0,
      children: [],
    });
  }

  // temparary function
  addGroup() {
    this.inputs.push({
      definition: {
        id: this.randomId(),
        address: null,
        title: 'Input Group',
        type: 'Object',
      },
      children: [
        /* {
          id: this.randomId(),
          address: 'Sheet1-C4:C5',
          name: 'M/F',
          default: 'M',
          maxItems: null,
          format: null,
          required: false,
          title: 'F',
          type: 'String',
          transpose: false,
          msoFormat: 'General',
          options: null,
          order: 5,
        }, */
      ],
      type: 2,
    });

    // IMPORTANT:

    // Hide DOM - to update list element
    this.isAdding = true;
    // remove previous sortable elements
    this.executeSortable(true);
    // Show DOM - to update list element
    this.isAdding = false;

    // Reinitialize sortables after DOM has been updated
    setTimeout(() => {
      this.executeSortable();
    }, 0);
  }
}
