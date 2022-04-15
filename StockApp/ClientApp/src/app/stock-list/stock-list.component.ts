import { Component, OnInit, ViewChild } from '@angular/core';
import { stock } from '../models/ui-models/stock.model';
import { StockService } from './stock.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  stocks : stock[]=[];
  displayedColumns: string[] = ['description', 'displaySymbol', 'currency', 'type'];
  dataSource:MatTableDataSource<stock> = new MatTableDataSource<stock>();
  public title: string = "StockApp";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';

  constructor(private stockservices:StockService) { }

  ngOnInit(): void {
   // debugger;
    this.stockservices.getStocks().subscribe(
      (succes) =>{
        this.stocks =succes;
        this.dataSource = new MatTableDataSource<stock>(this.stocks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort=this.sort;
      },
      (err) =>{

      }
    )
  }
  filterStocks(){
    this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }
}
/*
Common Stock
ETP
PUBLIC
ADR
Equity WRT
Closed-End Fund
REIT
NVDR
Unit
CDI
Royalty Trst
GDR
Right
Ltd Part
Foreign Sh.
Open-End Fund
NY Reg Shrs
*/