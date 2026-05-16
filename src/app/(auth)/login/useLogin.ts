import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import axios from 'axios';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await login(email, senha);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErro(error.response?.data?.details || 'Erro ao fazer login. Verifique suas credenciais.');
      } else {
        setErro('Ocorreu um erro inesperado. Tente novamente.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return { email, setEmail, senha, setSenha, erro, carregando, handleSubmit };
}