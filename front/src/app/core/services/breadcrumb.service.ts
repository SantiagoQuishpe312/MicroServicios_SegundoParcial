import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Breadcrumb } from 'src/@vex/interfaces/breadcrumb.interface';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private itemsSource: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<
    Breadcrumb[]
  >([]);

  itemsHandler = this.itemsSource.asObservable();

  setItems(items: Breadcrumb[]) {
    this.itemsSource.next(items);
  }
}
