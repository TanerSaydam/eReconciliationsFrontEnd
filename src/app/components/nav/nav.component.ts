import { Component, OnInit } from '@angular/core';
import { UserOperationClaimService } from 'src/app/services/user-operation-claim.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private userOperationClaimService:UserOperationClaimService
  ) { }

  ngOnInit(): void {
  }

 

}
