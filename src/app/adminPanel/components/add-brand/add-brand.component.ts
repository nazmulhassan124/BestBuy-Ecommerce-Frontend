import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/Model/brand.model';
import { BrandServiceService } from 'src/app/service/brandService/brand-service.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent  implements OnInit{
 

      displayedColumns: string[] = ['Brand ID', 'Brand Name','Brand Images', 'Brand Description', 'Actions'];
  dataSource!: MatTableDataSource<Brand>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  msg="";
  msgcolor="red"
  buttonview= false;


      constructor(
        public brandService: BrandServiceService
      ) { }

      ngOnInit(): void {
        this.getAll();
        this.brandService.refreshNeed.subscribe(() => {
          this.getAll();
        });
         
      }

      togglePanel() {
        this.brandService.panelOpenState = !this.brandService.panelOpenState
      }
    
    
      
      createOrUpdate(currentBrand: Brand) {
    
        if (currentBrand.brandId != null) {
          this.update(currentBrand);
        } else {
          this.create(currentBrand);
        }
    
      }
    
      create(cat: Brand) {
    
        if( !cat.brandName || !cat.brandName===null){
          this.msgcolor="red"
          this.msg = " Plese fill all Field "
        }else{
        this.brandService.create(cat).subscribe((data: any) => {
          this.msgcolor="green"
          this.msg = "Saved Successfully!"
            this.clear();
          
        });
      }
       
      }
    
      update(cat: Brand) {
        this.brandService.update(cat).subscribe((data)=>{
          this.msgcolor="green"
    
          this.msg = "Update Successfully!!"
            this.clear();
        });
      }
    
      delete(catid: number) {
        this.brandService.delete(catid).subscribe();
      }
    
      edit(cat: Brand) {
        this.brandService.currentBrand = Object.assign({}, cat);
        this.togglePanel();
      }
      
      getAll(){
        this.brandService.getAll().subscribe(
          (data: Brand[]) => {
            this.dataSource= new MatTableDataSource (data);
            this.dataSource.paginator = this.paginator;
          }
        );
      }
    
      clear() {
        this.brandService.currentBrand = new Brand();
        this.buttonview=false;
      }
      msgclear(){this.msg=""}
    
     

}
