
type Retirada = {
    valor: number,
    irpf: number,
    iof: number,
    taxes: number,
};

type Deposito = {
    valor: number,
};

type InvestmentRecord = {
    valorEfetivo: number,
    deposito?: Deposito,
    retirada?: Retirada,
};
