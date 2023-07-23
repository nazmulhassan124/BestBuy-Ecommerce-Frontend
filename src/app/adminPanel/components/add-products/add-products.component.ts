import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from 'src/app/Model/brand.model';
import { Category } from 'src/app/Model/category.model';
import { Product } from 'src/app/Model/product.model';
import { SubCategory } from 'src/app/Model/subCategory.model';
import { BrandServiceService } from 'src/app/service/brandService/brand-service.service';
import { CategoryService } from 'src/app/service/categoryService/category.service';
import { ProductService } from 'src/app/service/productService/product.service';
import { SubCategoryService } from 'src/app/service/subcategoryService/sub-category.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit{

  displayedColumns: string[] = ['Product ID', 'Name', 'Category','SubCategory','Brand','Color','Regular Price','Offer Price','Quantity','Images', 'Actions'];
  dataSource!: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  msg="";
  msgcolor="red"
  buttonview= false;

  allproduct!:Product[];
  allCategory !: Category [];
  catwiseBrand!: Brand[];
  catwiseSubcat!:SubCategory[];

  constructor(
    public productService: ProductService,
    public categoryService : CategoryService,
    public subcategoryService: SubCategoryService,
    public brandService: BrandServiceService
  ) { }
  ngOnInit(): void {
    this.getAll();
    this.productService.refreshNeed.subscribe(() => {
      this.getAll();
    });
     
     this.productService.getAllProduct().subscribe((data: Product[])=>{
      this.allproduct=data;
     });



    this.categoryService.getAllCategory().subscribe((data: Category[])=>{
      this.allCategory=data;
     });

     this.subcategoryService.getAll().subscribe((data: SubCategory[])=>{
      this.catwiseSubcat=data;
     });

     this.brandService.getAll().subscribe((data: Brand[])=>{
      this.catwiseBrand=data;
     });
  }

  Catvalue ( cat : Category){
    this.productService.currentProduct.catId= cat.id;

    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    this.productService.currentProduct.createdBy= userData.name;
  }
  BrandId(br : Brand){
    this.productService.currentProduct.brandId= br.brandId;
  
  }
  subCatId(subcat :SubCategory){
    this.productService.currentProduct.subCatId= subcat.catId;
  }

  togglePanel() {
    this.productService.panelOpenState = !this.productService.panelOpenState
  }

  createOrUpdateProduct(currentProduct: Product) {

    if (currentProduct.id != null) {
      this.update(currentProduct);
    } else {
      this.create(currentProduct);
    }
  }

    
  create(cat: Product) {

    if( !cat.name || !cat.name===null){
      this.msgcolor="red"
      this.msg = " Plese fill all Field "
    }else{
    this.productService.createProduct(cat).subscribe((data: any) => {
      this.msgcolor="green"
      this.msg = "Saved Successfully!"
        this.clear();
      
    });
  }
   
  }

  update(cat: Product) {
    this.productService.updateProduct(cat).subscribe((data)=>{
      this.msgcolor="green"

      this.msg = "Update Successfully!!"
        this.clear();
    });
  }

  delete(catid: number) {
    this.productService.deleteProduct(catid).subscribe();
  }

  edit(cat: Product) {
    this.productService.currentProduct = Object.assign({}, cat);
    this.buttonview=true;
    this.togglePanel();
  }
  
  getAll(){
    this.productService.getAllProduct().subscribe(
      (data: Product[]) => {
        this.dataSource= new MatTableDataSource (data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }

  clear() {
    this.productService.currentProduct = new Product();
    this.buttonview=false;
  }

  msgclear(){this.msg=""}

  




}
