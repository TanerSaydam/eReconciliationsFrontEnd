export interface AccountReconciliation {
  id: number;
  companyId: number;
  currencyAccountId: number;
  startingDate: string;
  endingDate: string;
  currencyId: number;
  currencyDebit: number;
  currencyCredit: number;
  isSendEmail: boolean;
  sendEmailDate: string;
  isEmailRead: boolean;
  emailReadDate: string;
  isResultSucceed: boolean;
  resultDate: string;
  resultNote: string;
  guid: string;
}
