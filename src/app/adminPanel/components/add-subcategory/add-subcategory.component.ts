import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Model/category.model';
import { SubCategory } from 'src/app/Model/subCategory.model';
import { CategoryService } from 'src/app/service/categoryService/category.service';
import { SubCategoryService } from 'src/app/service/subcategoryService/sub-category.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.css']
})
export class AddSubcategoryComponent implements OnInit{

  displayedColumns: string[] = ['SubCategory ID', 'SubCategory Name','SubCategory Images', 'SubCategory Description','Category Name', 'Actions'];
  dataSource!: MatTableDataSource<SubCategory>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  msg="";
  msgcolor="red"
  buttonview= false;
  allCategory !: Category [];
  catname: string="";


  constructor(
    public subCategoryService: SubCategoryService,
    public categoryService : CategoryService
  ) { }

  ngOnInit(): void {
    this.getAll();
    this.subCategoryService.refreshNeed.subscribe(() => {
      this.getAll();
    });
     
     this.categoryService.getAllCategory().subscribe((data: Category[])=>{
      this.allCategory=data;
     });

  }

Catvalue ( cat : Category){
  this.catname= cat.catName
   this.subCategoryService.currentSubCategory.catName= this.catname;
   
 // console.log( " sub Cat"+ this.subCategoryService.currentSubCategory);
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

    if( !cat.subCatName || !cat.subCatName===null || !cat.subCatImage){
      this.msgcolor="red"
      this.msg = " Plese fill all Field "
    }else{
    this.subCategoryService.create(cat).subscribe((data: any) => {
      this.msgcolor="green"
      this.msg = "Saved Successfully!"
     console.log(cat.catName);
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
    this.buttonview=true;
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
   this.ngOnInit();
  }
  msgclear(){this.msg=""}

 

}
