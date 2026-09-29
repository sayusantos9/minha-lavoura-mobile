# Minha Lavoura — app mobile

Aplicativo **React Native + Expo**, para Android e iPhone. As telas são componentes nativos, não uma página web dentro do app.

## Começar no Windows

1. Instale Node.js 22 LTS ou superior compatível e o **Expo Go** no celular.
2. Extraia o ZIP inteiro.
3. Abra a pasta `MinhaLavouraMobile` no VS Code.
4. No terminal **Prompt de Comando (CMD)**, execute uma linha por vez:

```bat
npm install
npm run configurar
npm start
```

Também pode abrir `INICIAR_WINDOWS.bat`. Ele instala as dependências na primeira execução e inicia o Expo.

A etapa `configurar` pede ao Expo as versões compatíveis das bibliotecas para o SDK 57. São necessários internet e acesso ao registro npm na primeira instalação.

- **Android:** abra o Expo Go e leia o QR code.
- **iPhone:** leia o QR code pela câmera do iPhone e abra com o Expo Go.
- Computador e celular devem estar na mesma rede Wi-Fi. Se a rede bloquear a conexão, tente `npx expo start --tunnel` (pode exigir uma instalação adicional).
- No PowerShell, se `npm.ps1` estiver bloqueado, use o terminal CMD ou `npm.cmd` / `npx.cmd`. Não é preciso alterar a política do Windows.

## Login de teste

Na abertura, toque em **Explorar demonstração**.

- E-mail: `demo@minhalavoura.app`
- Senha: `lavoura123`

O acesso de demonstração tem dados de exemplo como os do protótipo. **Criar conta** abre uma conta local nova e vazia. Cadastre os talhões e insumos para começar.

## Telas e funções

- **Abertura:** imagem do agricultor, login, cadastro e acesso de demonstração.
- **Minha lavoura:** indicadores calculados, culturas agrupadas e atividades. Toque numa atividade para concluir; mantenha pressionado para editar.
- **Monitoramento:** seleção e cadastro de talhões, área, cultura, estágio, irrigação, observações e fotos da galeria.
- **Clima:** registro manual de temperatura e condição observada. Não há previsão automática.
- **Insumos e estoque:** filtros, cadastro, edição, alerta de mínimo e histórico de entradas/saídas. Saídas acima do saldo são bloqueadas.
- **Máquinas e ferramentas:** cadastro, status, horas de uso e data de manutenção.
- **Relatórios:** inventário e uso de máquinas; exportar e compartilhar PDF pelo celular.
- **Perfil:** alterar nome/propriedade e sair.

Os botões de `+`, os cartões de talhões, insumos e máquinas abrem seus formulários. Os formulários de edição permitem excluir registros.

## Dados e limites deste protótipo

- Todos os dados ficam no aparelho usando AsyncStorage. Não dependem do ChatGPT.
- Cadastro e login são **locais para demonstração**; não há servidor, verificação de e-mail, recuperação de senha ou sincronização entre celulares. Use senhas de teste, nunca senhas de outras contas.
- As senhas não são gravadas como texto simples; o hash local não transforma o protótipo em um sistema de autenticação de produção.
- Desinstalar o app ou limpar seus dados pode apagar os registros. Faça isso somente quando não precisar deles.
- Fotos pequenas são armazenadas localmente; o app limita o tamanho para evitar ultrapassar a capacidade de uma chave de armazenamento.
- As fotos e miniaturas são recriações geradas para o protótipo. O design segue a imagem em `docs/referencia-prototipo.png`; ela não é uma captura do aplicativo executado.

## Organização

```text
App.js                    Navegação e composição do app
src/screens/              Telas mobile
src/components/           Formulários e componentes visuais
src/context/              Estado da sessão e da propriedade
src/services/             Armazenamento, login local e PDF
src/data/                 Dados de demonstração
src/utils/                Regras e formatação
assets/                   Imagens incluídas no projeto
```

## Verificações

`npm test` verifica movimentações, limites de estoque, números e indicadores. O código também passou por análise de sintaxe JSX e conferência de referências de arquivos. Não foi executado em emulador nem em um celular nesta entrega: a instalação de dependências no ambiente de criação foi bloqueada pela rede.

Após instalar as dependências no computador, você pode rodar:

```bat
npx expo-doctor
npx expo export --platform android
```

## Gerar APK posteriormente

O projeto inclui `eas.json` com perfil `preview` que produz APK. Requer conta Expo e configuração própria do EAS:

```bat
npx eas-cli login
npx eas-cli build:configure
npx eas-cli build --platform android --profile preview
```

O ZIP é o código-fonte; não inclui um APK compilado. Para testar no Expo Go, não é necessário gerar APK.
