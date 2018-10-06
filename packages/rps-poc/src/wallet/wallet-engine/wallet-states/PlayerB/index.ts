import * as CommonState from '..';

export type ReadyToDeposit = CommonState.AdjudicatorReceived;
export class WaitForAToDeploy { }
export class WaitForBlockchainDeposit { }
export class WaitForApprovalWithAdjudicator extends CommonState.WaitForApproval {
  adjudicatorAddress: string;
  constructor({ adjudicatorAddress, myAddress, opponentAddress, myBalance, opponentBalance }) {
    super({ myAddress, opponentAddress, myBalance, opponentBalance });
    this.adjudicatorAddress = adjudicatorAddress;
  }
}
export const FundingFailed = CommonState.FundingFailed;
export const WaitForApproval = CommonState.WaitForApproval;
export const Funded = CommonState.Funded;
export const ReadyToDeposit = CommonState.AdjudicatorReceived;
export const WithdrawAndConclude = CommonState.WaitForWithdrawl;
export const SelectWithdrawlAddress = CommonState.SelectWithdrawlAddress;
export type PlayerBState =
  | ReadyToDeposit
  | WaitForAToDeploy
  | WaitForBlockchainDeposit
  | CommonState.WaitForApproval
  | CommonState.FundingFailed
  | CommonState.AdjudicatorReceived
  | CommonState.Funded
  | CommonState.SelectWithdrawlAddress
  | CommonState.WaitForWithdrawl;
