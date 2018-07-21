import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { Storage } from '@ionic/storage';
import { v4 as uuid } from 'uuid';

import { PAGE } from '../../constant/constant';
import { MessageProvider } from '../../providers/message/message';
import { ProductProvider } from '../../providers/product/product';
import { CategoryProvider } from '../../providers/category/category';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';


@IonicPage()
@Component({
  selector: 'page-product-form',
  templateUrl: 'product-form.html',
})
export class ProductFormPage {

  @ViewChild('fileInput') fileInput;

  isCreate: boolean;

  isReadyToSave: boolean;

  form: FormGroup;

  product: Product;

  categoryId: string;

  categories: Array<Category>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public events: Events,
    public camera: Camera,
    public messageProvider: MessageProvider,
    public productProvider: ProductProvider,
    public categoryProvider: CategoryProvider,
    public formBuilder: FormBuilder) {
  }

  ionViewWillEnter() {
    this.init();
  }

  private init(): void {
    this.product = this.navParams.get('product');

    if (!this.product) {
      this.events.publish(PAGE, { page: 'ProductPage', params: {} });
    } else {
      this.initVariable()
      this.initCategories();
    }
  }

  private initVariable(): void{
    this.isCreate = this.product.id === '';
  }

  private initCategories(): void{
    this.categoryProvider.findAll().subscribe(categories => {
      this.categories = categories;

      if(this.isCreate && categories.length > 0){
        this.categoryId = categories[0].id;
      }else{
        this.categoryId = (typeof this.product.category === 'string') ? this.product.category : this.product.category.id;
      }

      this.initForm();
    })
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      image: [this.product.image, Validators.required],
      price: [this.product.price, Validators.required],
      category: [this.categoryId, Validators.required]
    });

    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    } else {
      this.messageProvider.confirmSave(() => this.saveCallback(this.form.value));
    }
  }

  private saveCallback(product: Product): void {
    if (this.isCreate) {
      this.create(product);
    } else {
      this.modify(product);
    }
  }

  private create(product: Product): void {
    product.id = uuid();
    this.productProvider.save(product).subscribe(result => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private modify(product: Product): void {
    product.id = this.product.id;
    this.productProvider.update(product).subscribe(result => {
      this.showMessage();
    }, (error) => {
      this.messageProvider.toast('Error : ' + error);
    });
  }

  private showMessage(): void {
    this.navCtrl.popToRoot();
    this.messageProvider.toastSave();
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'image': 'data:image/png;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    if (event.target.files.length != 0) {
      let reader = new FileReader();
      reader.onload = (readerEvent) => {
        let imageData = (readerEvent.target as any).result;
        this.form.patchValue({ 'image': imageData });
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getImageStyle() {
    return 'url(' + this.form.controls['image'].value + ')'
  }

}
