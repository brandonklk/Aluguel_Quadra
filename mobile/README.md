# Mobile aluguel de quadra

## Tecnologias

#### - Utilizado

  - React Native
  - Axios
  - React Navigation
  - React Icons
  - Expo
  - Expo Mail
  - Formik
  - Yup
  - I18n

## Instalar o expo no sua máquina
- `npm install --global expo-cli`

## Como rodar

- Realizar o downlod do Node
- Realizar o download do aplicativo `expo` no seu celular
- Rodar `npm install` e `npm start` na pasta raiz
- Um site será aberto e um QR code aparecerá
- Abra o aplicativo baixado e aponte a sua câmera para o QR code
- Nesse momento a aplicação será aberta no seu celular

## Configuração do arquivo `Api.js`

- O arquivo `api.js` é o arquivo responsavel por realizar as requisições do aplicativo para o back-end portanto o mesmo deve ser configurado da seguinte forma.
- Criar um arquivo na pasta raiz do projeto no mobile chamado `.env` e criar uma propriedade chamada `IP_RUN_BACKEND`, ficando da seguinte forma `IP_RUN_BACKEND=Meu numero de IPv4`.

```javascript
const api = axios.create({
    baseURL: 'http://IP onde esta rodando o backend:porta do backend'
});
```