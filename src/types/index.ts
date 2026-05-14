export interface UsuarioResponseDTO {
  id: number;
  status: boolean;
  cpf: string;
  email: string;
  perfis: string[];
}

export interface ErrorResponse {
  status: number;
  title: string;
  details: string;
  timestamp: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}