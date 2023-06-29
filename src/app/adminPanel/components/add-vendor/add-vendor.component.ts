import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Vendor } from 'src/app/Model/vendor.model';
import { VendorService } from 'src/app/service/vendorService/vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit{

  displayedColumns: string[] = ['Vendor ID', 'Vendor Name', 'Vendor Description', 'Actions'];

  dataSource!: MatTableDataSource<Vendor>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
   msg="";


constructor(public vendorService: VendorService){}
  
ngOnInit(): void {
  this.getAllVendor();
  this.vendorService.refreshNeed.subscribe(() => {
    this.getAllVendor();
  });
   
  }

  togglePanel() {
    this.vendorService.panelOpenState = !this.vendorService.panelOpenState
  }

  createOrUpdateVendor(currentVendor: Vendor) {
 
    if (currentVendor.vendorId != null) {
      this.updateVendor(currentVendor);
    } else {
      this.createVendor(currentVendor);
    }

    this.msg="Saved Successfully!!"
  }

  createVendor(ven: Vendor) {
    this.vendorService.createVendor(ven).subscribe();
  }

  getAllVendor(){
    this.vendorService.getAllVendor().subscribe(
      (data: Vendor[]) => {
        this.dataSource= new MatTableDataSource (data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteVendor(venId: number) {
    this.vendorService.deleteVendor(venId).subscribe();
  }

  editVendor(cat: Vendor) {
    this.vendorService.currentVendor = Object.assign({}, cat);
    this.togglePanel();
  }
  updateVendor(ven: Vendor) {
    this.vendorService.updateVendor(ven).subscribe();
  }

  clear(){
    this.vendorService.currentVendor = new Vendor();
   }
}
