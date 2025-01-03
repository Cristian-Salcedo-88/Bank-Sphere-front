export interface BusinessClient {
    delegateName: string | null;
    delegateIdentificationNumber: string | null;
    delegatePhone: string | null;
  }
  
  export interface ClientResponse {
    clientId: number;
    name: string;
    identificationNumber: string;
    phone: string;
    personType: 'NATURAL' | 'JURIDICO';
    businessClient: BusinessClient;
  }
  
  export interface ClientRegister {
    name: string;
    identificationNumber: string;
    phone: string;
    personType: 'NATURAL' | 'JURIDICO';
    businessClient: BusinessClient;
  }