export interface GetClientsHighestBalance{
    name: string,
    identificationNumber: string,
    accountType: 'AHORROS' | 'CORRIENTE' | "CDT",
    balance: number
  } 

export interface GetAverageBalanceByType{
    accountType: 'AHORROS' | 'CORRIENTE' | "CDT",
    averageBalance: number
  } 