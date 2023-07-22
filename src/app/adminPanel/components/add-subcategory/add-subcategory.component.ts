import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SubCategory } from 'src/app/Model/subCategory.model';
import { SubCategoryService } from 'src/app/service/subcategoryService/sub-category.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit{

  displayedColumns: string[] = ['SubCategory ID', 'SubCategory Name','SubCategory Images', 'SubCategory Description', 'Actions'];
  dataSource!: MatTableDataSource<SubCategory>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  msg="";
  msgcolor="red"
  buttonview= false;


  constructor(
    public subCategoryService: SubCategoryService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.subCategoryService.refreshNeed.subscribe(() => {
      this.getAll();
    });
     
  }


  
  togglePanel() {
    this.subCategoryService.panelOpenState = !this.subCategoryService.panelOpenState
  }


  
  createOrUpdate(currentSubcat: SubCategory) {

    if (currentSubcat.subCatId != null) {
      this.update(currentSubcat);
    } else {
      this.create(currentSubcat);
    }

  }

  create(cat: SubCategory) {

    if( !cat.subCatName || !cat.subCatName===null){
      this.msgcolor="red"
      this.msg = " Plese fill all Field "
    }else{
    this.subCategoryService.create(cat).subscribe((data: any) => {
      this.msgcolor="green"
      this.msg = "Saved Successfully!"
     
        this.clear();
      
    });
  }
   
  }

  update(cat: SubCategory) {
    this.subCategoryService.update(cat).subscribe((data)=>{
      this.msgcolor="green"

      this.msg = "Update Successfully!!"
        this.clear();
    });
  }

  delete(catid: number) {
    this.subCategoryService.delete(catid).subscribe();
  }

  edit(cat: SubCategory) {
    this.subCategoryService.currentSubCategory = Object.assign({}, cat);
    this.togglePanel();
  }
  
  getAll(){
    this.subCategoryService.getAll().subscribe(
      (data: SubCategory[]) => {
        this.dataSource= new MatTableDataSource (data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  clear() {
    this.subCategoryService.currentSubCategory = new SubCategory();
    this.buttonview=false;
  }
  msgclear(){this.msg=""}

 

}
