/**
 * Investment Accounting Monitor
 * - Data Entities
 */
type Tax = {
  type: 'irpf' | 'iof';
  amount: number;
  percentile?: number;
};

type Withdrawal = {
  netAmount: number;
  totalAmount: number;
  taxesAmount?: number;
  taxes: Tax[];
};

type Deposit = {
  amount: number;
};

type ReturnOnInvestment = {
  amount: number;
  percentile: number;
}; // TODO: refine this part to cover different CDB   product and operations

// Registro com soma
type InvestmentRecord = {
  // Metadata
  effectiveValue: number;
  referenceDate: Date; // TODO: look for alternative to Day.js in typescript

  // Referenced entities
  // TODO: is there a pattern for referencing entities in TS?
  deposit?: Deposit;
  withdrawal?: Withdrawal;
  returnOnInvestment: ReturnOnInvestment;
};

// Movimentação e Rendimentos do Período - Balanço diário
// -> Nota: incluir data início, e exibir apenas dias bancários
// TODO: procurar lista de dias bancários

// TODO: study bookkeeping / accounting terms in English: https://en.wikipedia.org/wiki/Bookkeeping
// @see https://www.investopedia.com/investing-4427685
