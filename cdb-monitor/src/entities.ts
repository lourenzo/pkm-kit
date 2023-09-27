/**
 * Contabilidade - visualização
 */
// Saída
type Retirada = {
	valor: number;
	irpf: number;
	iof: number;
	taxes: number;
};

// Entrada
type Deposito = {
	valor: number;
};

// Registro com soma
type InvestmentRecord = {
	valorEfetivo: number;
	deposito?: Deposito;
	retirada?: Retirada;
};

// Movimentação do Período
// -> Nota: incluir
