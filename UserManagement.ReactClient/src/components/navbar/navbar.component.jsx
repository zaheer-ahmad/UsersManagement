function Navigation() {
  return (
    <>
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a  class="navbar-brand" routerLink ="/userlist" *ngIf="isUserLoggedIn">{{'User Management'|translate}}</a>
    <span class="navbar-brand" *ngIf="!isUserLoggedIn">{{'User Management'|translate}}</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
            <a  href="#" [ngClass]="lang=='en'?'nav-link btn btn-outline-success my-2 my-sm-0':'nav-link'" (click)="changeLangage('en')" >English</a>
          </li>
        <li class="nav-item">
        <a  [ngClass]="lang=='ar'?'nav-link btn btn-outline-success my-2 my-sm-0':'nav-link'" href="#" (click)="changeLangage('ar')" >Arabic</a>
        </li>
        <li class="nav-item" *ngIf="isUserLoggedIn">
          <a  [ngClass]="lang=='ar'?'nav-link btn btn-outline-success my-2 my-sm-0':'nav-link'" href="#" (click)="logout()" >{{'Logout'|translate}}</a>
          </li>
      </ul> 
    </div>
  </nav> */}
    </>
  );
}

export default Navigation;
