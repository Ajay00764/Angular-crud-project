import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataService } from './services/table-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular-crud-project';
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'description',
    'image',
    'price',
    'rating',
    'options'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: TableDataService,

  ) { }

  ngOnInit(): void {
    this.getHotelList();
  }

  hotelRegister() {
    // const dialogRef = this.dialog.open(UpdateHotelsComponent)
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getHotelList();
    //     }
    //   }
    // })
  }

  storeData: any[] = []

  getHotelList() {
    this.service.getUserData().subscribe({
      next: (res: any) => {
        this.storeData = res;
        this.dataSource = new MatTableDataSource(this.storeData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(this.storeData)
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHotel(id: number) {
    console.log(this.storeData[id - 1])
    this.storeData.splice(id - 1, 1);
    console.log(id)
    this.dataSource = new MatTableDataSource(this.storeData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log(this.storeData)
  }

  openHotelForm(data: any) {
    // const dialogRef = this.dialog.open(UpdateHotelsComponent, {
    //   data,
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getHotelList();
    //     }
    //   }
    // })
  }

}
