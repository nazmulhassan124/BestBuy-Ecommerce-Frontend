import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/Model/category.model';
import { CategoryService } from 'src/app/service/categoryService/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{

  displayedColumns: string[] = ['Category ID', 'Category Name','Category Images', 'Category Description', 'Actions'];
  dataSource!: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  msg="";
  msgcolor="red"
  buttonview= false;


  constructor(
    public categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.categoryService.refreshNeed.subscribe(() => {
      this.getAllCategories();
    });
     
  }

  togglePanel() {
    this.categoryService.panelOpenState = !this.categoryService.panelOpenState
  }


  
  createOrUpdateCategory(currentCategory: Category) {

    if (currentCategory.id != null) {
      this.updateCategory(currentCategory);
    } else {
      this.createCategory(currentCategory);
    }

  }

  createCategory(cat: Category) {

    if( !cat.catName || !cat.catName===null){
      this.msgcolor="red"
      this.msg = " Plese fill all Field "
    }else{
    this.categoryService.createCategory(cat).subscribe((data: any) => {
      this.msgcolor="green"
      this.msg = "Saved Successfully!"
        this.clear();
      
    });
  }
   
  }

  updateCategory(cat: Category) {
    this.categoryService.updateCategory(cat).subscribe((data)=>{
      this.msgcolor="green"

      this.msg = "Update Successfully!!"
        this.clear();
    });
  }

  deleteCategory(catid: number) {
    this.categoryService.deleteCategory(catid).subscribe();
  }

  editCategory(cat: Category) {
    this.categoryService.currentCategory = Object.assign({}, cat);
    this.buttonview=true;
    this.togglePanel();
  }
  
  getAllCategories(){
    this.categoryService.getAllCategory().subscribe(
      (data: Category[]) => {
        this.dataSource= new MatTableDataSource (data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  clear() {
    this.categoryService.currentCategory = new Category();
    this.buttonview=false;
  }
  msgclear(){this.msg=""}

}
