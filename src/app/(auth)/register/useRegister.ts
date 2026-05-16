import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../services/api';
import axios from 'axios';

export function useRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setCarregando(true);
    
    try {
      await api.post('/auth/register', { nome: name, email, cpf, senha: password });
      alert('Cadastro realizado com sucesso! Faça seu login.');
      router.push('/login');
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        if (data?.errors && data.errors.length > 0) {
          setError(data.errors[0].message);
        } else {
          setError(data?.details || data?.message || 'Erro ao cadastrar usuário.');
        }
      } else {
        setError('Ocorreu um erro inesperado ao tentar cadastrar.');
      }
    } finally {
      setCarregando(false);
    }
  }

  return { setName, setEmail, setCpf, setPassword, error, carregando, handleSubmit };
}