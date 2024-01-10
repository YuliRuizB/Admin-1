import { Component, Input, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GridOptions } from 'ag-grid-community';
import { NzMessageService, UploadChangeParam } from 'ng-zorro-antd';
import { Observable, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { PromotionService } from 'src/app/shared/services/promotions.service';
import { RolService } from 'src/app/shared/services/roles.service';
import { UploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  @Input() accountId: string = '';
  view: string = 'cardView';
  sub: Subscription;
  user: any;
  userlevelAccess:string;
  validateForm: FormGroup;
  infoLoad: any = [];
  programForm: FormGroup;
  isCreateVisible: boolean = false;
  isEditMode: boolean = false;
  currentSelectedId: string;
  currentSelected: any;
  fileListInfo: any = [];
  fileList;
  fileUrl: string = "http://themenate.com/applicator/dist/assets/images/avatars/thumb-13.jpg";
  autosave: boolean = true;
  uploading: boolean = false;
  bucketPath: string = 'promotions/';
    // Upload Task 
    task: AngularFireUploadTask;
    // Progress in percentage
    uploadPercent: Observable<number>;
    uploadvalue: number = 0;
    downloadURL: Observable<string>;
    // Snapshot of uploading file
    snapshot: Observable<any>;
    // Uploaded File URL
    UploadedFileURL: Observable<string>;
    pageSize: number = 10;
    usersList: any = [];
    columnDefs;
    rowGroupPanelShow = [];
    gridOptions: GridOptions = this.getGridOptions();
    popupParent: any
    gridApi: any;
    gridColumnApi: any;;
    promotionsList:any = [];
    showUploadList = {
      showPreviewIcon: true,
      showRemoveIcon: true,
      hidePreviewIconInNonImage: true
    };
    previewImage: string | undefined = '';
    previewVisible = false;

  constructor(
    public authService: AuthenticationService,
    private rolService: RolService,   
    private bucketStorage: AngularFireStorage, 
    private messageService: NzMessageService,
    private promotionsService: PromotionService,
    private fb: FormBuilder
  ) { 
    this.authService.user.subscribe((user) => {
      this.user = user;
      if (this.user.rolId != undefined) { // get rol assigned               
          this.rolService.getRol(this.user.rolId).valueChanges().subscribe(item => {
              this.infoLoad = item;
              this.userlevelAccess = this.infoLoad.optionAccessLavel;                 
          });
      }
  });
  this.columnDefs = [
    {
      headerName: 'Activo', width: 50,field: 'active',
      cellRenderer: 'agGroupCellRenderer', sortable: true
    },
    { headerName: 'Name', width: 200,sortable: true, field: 'name' },
    { headerName: 'Descripción',width: 300, field: 'description' },
    { headerName: 'Desde', sortable: true,width: 180, field: 'validFrom' },
    { headerName: 'Hasta', sortable: true,width: 180,field: 'validTo' },  
    {
      headerName: 'Fecha Creacion',
      width: 180,
      sortable: true,
      field: 'date_created',
      cellRenderer: (params) => {
        // Assuming 'date_created' is a Firestore Timestamp or a UNIX timestamp
        const date = params.value.toDate(); // Convert Firestore Timestamp to JavaScript Date
    
        // Format the date as per your requirement
        const formattedDate = date.toLocaleDateString(); // Adjust the format as needed
    
        return formattedDate;
      }
    },
  ];


  this.createForm();
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  showImage(imageUrl: any){

  }
  diactivePromotio0n(uid: any){
    this.promotionsService.deactivePromotion(uid,this.accountId);  
  }

  editPromotion(uid: any){
    /* this.promotionsService.editPromotion(uid).then(() => {          
      this.messageService.success(`Todo salió bien.`, {
        nzPauseOnHover: true,
        nzDuration: 3000
      });
    }) */
  }
  deletePromotiom(uid: any){
    /* this.promotionsService.deactivePromotion(uid).then(() => {          
      this.messageService.success(`Todo salió bien.`, {
        nzPauseOnHover: true,
        nzDuration: 3000
      });
    }) */
  }

  promotionSelected(data:any) {
    
  }
  createForm() {
    this.programForm = this.fb.group({
      imageUrl: [''],
      active: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: [],
      validFrom: [],
      validTo: [],
      date_created:[]
  })
  }
  toggleActive(data) {

  }

  ngOnInit() {  
    console.log(this.accountId);
    this.sub = this.promotionsService.getPromotionsList(this.accountId).pipe(
      map(actions => actions.map(a => {
        const id = a.payload.doc.id;
        const data = a.payload.doc.data() as any;
        return { id, ...data }
      }))
    )
      .subscribe((prom) => {
       
        this.promotionsList = prom;
       // console.log("listado");
       // console.log(this.promotionsList)
      });

     
  }
  showCreateModal() {
    this.programForm.reset();
    this.isCreateVisible = true;
    this.currentSelectedId = null;
    this.currentSelected = null;
  }

  showModalDelete(data) {
    console.log(data);
   /*  if (this.userlevelAccess == "1") {
      this.routesService.deleteRouteAssignments(this.accountId, data.routeId, data.id).then(() => {
        this.isCreateVisible = false;
        this.isEditMode = false;
      })
        .catch(err => console.log(err));
    } else {
      this.sendMessage('error', "El usuario no tiene permisos para borrar datos, favor de contactar al administrador.");
    } */
   
  }

  sendMessage(type: string, message: string): void {
    this.messageService.create(type, message);
}

  handleCancel() {
    this.isCreateVisible = false;
    this.isEditMode = false;
    this.currentSelectedId = null;
  }

  createPromotion() {
    if (this.programForm.valid) {

      var advanceForm: object;

      advanceForm = {
        active: true,    
        name: this.programForm.controls['name'].value,
        description: this.programForm.controls['description'].value, 
        validFrom: this.programForm.controls['validFrom'].value,
        validTo: this.programForm.controls['validTo'].value,
        imageUrl: this.programForm.controls['imageUrl'].value || "",
        customerId:  this.user.customerId,
        category: "",
        date_created :  new Date().toISOString(),
      };  

      console.log(advanceForm);
      if (this.userlevelAccess != "3") {
        this.promotionsService.savePromotion(advanceForm,this.accountId).then(() => {          
          this.messageService.success(`Todo salió bien.`, {
            nzPauseOnHover: true,
            nzDuration: 3000
          });

        })
      } else {
        this.sendMessage('error', "El usuario no tiene permisos para actualizar datos, favor de contactar al administrador.");
      }
    }
  }
  handleChange2({ file, fileList }: UploadChangeParam): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(file, fileList);
    }
    this.fileListInfo = file;
    if (status === 'done') {
      this.sendMessage('success',`${file.name} Archivo cargado satisfactoriamente.`);
    } else if (status === 'error') {
      this.sendMessage('error',`${file.name} archivo fallido, favor de validar.`);
    }

    this.getBase64(file.originFileObj, (img: string) => {
      this.fileUrl = img;
          const fileRef = this.bucketStorage.ref(this.bucketPath);

      this.task = this.bucketStorage.ref(this.bucketPath).putString(img, 'data_url');

      // observe percentage changes
      this.uploadPercent = this.task.percentageChanges();
      this.uploadPercent.pipe(
        map(a => {
          return Number((a / 100).toFixed(2));
        })
      ).subscribe((value) => {
        this.uploading = value != 0;
        this.uploadvalue = value;
      })

      // get notified when the download URL is available
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.uploading = false;
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(async (url) => {
              this.updateAdvanceURL(url);
          });
        })
      ).subscribe();
    });
  }


  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  async updateAdvanceURL(url) {
    console.log("url");
    console.log(url);
    this.programForm.controls['imageUrl'].patchValue(url);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  getGridOptions() {
    return {
      columnDefs: this.columnDefs,
      context: {
        thisComponent: this
      },
      rowData: null,
      rowSelection: 'single',
      pagination: true,
      paginationPageSize: this.pageSize,

      enableFilter: true,
      statusBar: {
        statusPanels: [
          { statusPanel: 'agFilteredRowCountComponent' },
          { statusPanel: 'agSelectedRowCountComponent' },
          { statusPanel: 'agAggregationComponent' }
        ]
      },
      enableRangeSelection: true
    };
  }
  setPaginationPageSize(pageSize: number = 10) {
    this.pageSize = pageSize;
    console.log(this.gridApi);
    this.gridApi.paginationSetPageSize(Number(pageSize));
  }

  


}
