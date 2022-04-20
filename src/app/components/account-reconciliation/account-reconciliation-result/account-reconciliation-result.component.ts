import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AccountReconciliationDto } from 'src/app/models/dtos/accountReconciliationDto';
import { ReconciliationResultDto } from 'src/app/models/dtos/reconciliationResultDto';
import { AccountReconciliationService } from 'src/app/services/account-reconciliation.service';

@Component({
  selector: 'app-account-reconciliation-result',
  templateUrl: './account-reconciliation-result.component.html',
  styleUrls: ['./account-reconciliation-result.component.scss']
})
export class AccountReconciliationResultComponent implements OnInit {

  accountReconciliationDto:AccountReconciliationDto;
  reconciliationResultDto:ReconciliationResultDto = {
    "id":0,
    "name": "",
    "note": "",
    "result": false
  };
  resultName:string = "";
  resultNote:string = "";
  code:string = "";
  date:string;
  resultText:string = "Cevaplanmadı";
  result:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private accountReconciliationService:AccountReconciliationService,
    private toastr:ToastrService,
    private spinner:NgxSpinnerService,
    private datePipe:DatePipe
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p=>{
      this.code = p["value"];
      this.getByCode(p["value"]);
    })
  }

  getByCode(code:string){
    this.accountReconciliationService.getByCodeDto(code).subscribe((res)=>{
      this.accountReconciliationDto = res.data;
      //console.log(res.data)
      if (res.data.resultDate != null) {
        this.date = this.datePipe.transform(res.data.resultDate, 'dd.MM.yyyy')
        this.resultText = res.data.isResultSucceed ? "Mutabıkız" : "Mutabık Değiliz";
        this.resultNote = res.data.resultNote;
        this.result = res.data.isResultSucceed;
      }
    },(err)=>{
      console.log(err);
      this.toastr.error("Bir hatayla karşılaştık. Lütfen daha sonra tekrar deneyiniz.")
    })
  }

  updateResult(result:boolean) {
    this.reconciliationResultDto.id = this.accountReconciliationDto.id;
    this.reconciliationResultDto.name = this.resultName;
    this.reconciliationResultDto.note = this.resultNote;
    this.reconciliationResultDto.result = result;
      this.showSpinner();
      this.accountReconciliationService.sendResult(this.reconciliationResultDto).subscribe((res) => {
        this.hideSpinner();
        this.toastr.success(res.message);
        this.getByCode(this.code);
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
        this.hideSpinner();
      })
  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    this.spinner.hide();
  }

}
