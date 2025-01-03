  export interface ProductResponse {
    productId: number,
    clientId: number,
    accountType: 'AHORROS' | 'CORRIENTE' | "CDT" | "",
    balance: number,
    openingDate: Date | "",
    active: boolean
}

export interface ProductRegister {
    clientId: number,
    accountType: string,
    balance: number,
    interestRate: number | null
}

export interface UpdateProduct{
  productId: number,
  transactionType: 'DEPOSITO' | 'RETIRO' | 'CANCELACION' | '',
  amount: Number
} 

const productData : ProductResponse = {
    productId: 0,
    clientId: 0,
    accountType: "",
    balance: 0,
    openingDate: "",
    active: true 
}
export function CreateProductData(overrides: Partial<ProductResponse> = {}): ProductResponse{
  return Object.assign({}, productData, overrides)
}