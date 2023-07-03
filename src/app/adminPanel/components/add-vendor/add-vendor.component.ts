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
export class AddVendorComponent implements OnInit {

  displayedColumns: string[] = ['Vendor ID', 'Vendor Name', 'Vendor Email', 'Vendor Description', 'Actions'];

  dataSource!: MatTableDataSource<Vendor>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  msg = "";
  msgcolor="red"

  buttonview= false;
  

  constructor(public vendorService: VendorService) { }



  ngOnInit(): void {
    this.getAllVendor();
    this.vendorService.refreshNeed.subscribe(() => {
      this.getAllVendor();
    });

  }

  togglePanel() {
    this.vendorService.panelOpenState = !this.vendorService.panelOpenState
   //this.vendorService.panelOpenState=true;
  }


  createOrUpdateVendor(currentVendor: Vendor) {

    if (currentVendor.vendorId != null) {
      this.updateVendor(currentVendor);
   
    } else {
      this.createVendor(currentVendor);


    }


  }

  createVendor(ven: Vendor) {
    if( !ven.email || !ven.vendorName===null){
      this.msgcolor="red"
      this.msg = " Plese fill Name & Email field "
    }else{
    this.vendorService.createVendor(ven).subscribe((data: any) => {
      this.msgcolor="green"
      this.msg = "Saved Successfully!"
        this.clear();
      
    });
  }
  }

  getAllVendor() {
    this.vendorService.getAllVendor().subscribe(
      (data: Vendor[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  deleteVendor(venId: number) {
    this.vendorService.deleteVendor(venId).subscribe();
  }

  editVendor(cat: Vendor) {
    this.vendorService.currentVendor = Object.assign({}, cat);
    this.buttonview=true;
    this.togglePanel();

  }
  updateVendor(ven: Vendor) {
    this.vendorService.updateVendor(ven).subscribe((data :any)=>{
      this.msgcolor="green"

      this.msg = "Update Successfully!!"
        this.clear();
    });
  }

  clear() {
    this.vendorService.currentVendor = new Vendor();
    this.buttonview=false;
  }
  msgclear(){}
}
