
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from "@angular/core";


import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from "@angular/router";


import { SharedService } from "../../shared.service";
import { CommonModule } from "@angular/common";
import { UserService } from "../../services/user.service";


import { Subject, Subscription } from "rxjs";
import { DataTablesModule } from "angular-datatables";
import { HttpParams } from "@angular/common/http";

import { Config } from "datatables.net";
import { AuthService } from "../../services/auth.service";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { LanguageService } from "../../services/language.service";


@Component({
  selector: "app-userlist",
  standalone: true,
  imports: [RouterModule,CommonModule,DataTablesModule,TranslateModule],
  templateUrl: './userlist.component.html',
  styleUrl: './userlist.component.css'
})

export class UserListComponent implements OnInit, OnDestroy {
  gridRtl:boolean=false;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();
  users: any[] = [];
  userRole:string="";
  jQuery:any;
  private unlistener: () => void = ()=>{};
  private delUserSubscription: Subscription;
  private getUserSubscription: Subscription;

  constructor(private userService:UserService,
    private authService:AuthService,private router:Router,
    private languageService:LanguageService){}

  
  ngOnInit(): void {
    this.languageService.setInitialAppLanguage();
    this.userRole = this.authService.getRole();
    var that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback:any) => {

          let params = {'Draw':dataTablesParameters.draw,'Skip':dataTablesParameters.start == null?0:dataTablesParameters.start,
            'PageSize':  dataTablesParameters.length,'SearchValue':  dataTablesParameters.search.value,'SortBy':dataTablesParameters.order[0].name,
            'SortDirection':   dataTablesParameters.order[0].dir   
          };

          that.delUserSubscription = that.userService.getUsers(params)
          .subscribe(resp => {
            that.users = resp.data;
            console.log(resp);
            callback({
              draw:resp.draw,
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: resp.data
            });
          });
      },
      columns: this.getDynamicColumns()
    };
    
    console.log(this.userRole);
  }
  ngDoCheck(){
    var lang = this.languageService.getCurrentLanguage();
    this.gridRtl = lang == 'ar'?true:false;
  }
  getDynamicColumns() {
    var Name = this.languageService.getValue('Name');
    var UserName = this.languageService.getValue('User Name');
    var Email = this.languageService.getValue('Email');
    var Action = this.languageService.getValue('Action');
    var Edit = this.languageService.getValue('Edit');
    var Delete = this.languageService.getValue('Delete');
    var cols =  [
      { data: 'name', title: Name },
      { data: 'username', title: UserName },
      { data: 'email', title: Email },
      {
        title: Action,
        data: '',
        defaultContent: '', // Required for columns without a data source
        render: (data:any, type:any, row:any) => {
          return `
            <button class="btn btn-primary btn-sm edit"   data-id="${row.id}">${Edit}</button>
            <button class="btn btn-danger btn-sm delete" data-id="${row.id}">${Delete}</button>
          `;
        },
        orderable: false
      }
    ];
      if(this.userRole !== 'Admin')
      {
         cols.pop();
      }
      return cols;
    }
  
    ngAfterViewInit() {
      $(document).on('click', '.edit', (event) => {
        const id = $(event.currentTarget).data('id');
        this.router.navigate(['edituser',id]);
      });
      $(document).on('click', '.delete', (event) => {
        const id = $(event.currentTarget).data('id');
        if(window.confirm('Are sure you want to delete this item ?')){
          this.deleteUser(id);
         }
      });
    }
  ngOnDestroy(): void {
    if(this.dtTrigger)
    {
      this.dtTrigger.unsubscribe();  
    }
    this.unlistener();
    if(this.delUserSubscription)
    {
      this.delUserSubscription.unsubscribe();
    }
    if(this.getUserSubscription)
    {
      this.getUserSubscription.unsubscribe();  
    }
  }
 deleteUser(id:string){
    this.delUserSubscription = this.userService.deleteUser(id).subscribe(
      (res) => {this.router.navigate(['userlist'])},
      (error) => { console.log(error) }
    );
 }

  public themeClass: string = "ag-theme-quartz";
}
