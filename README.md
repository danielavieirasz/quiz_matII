# quiz_matII
Quiz de recuperação MatII

## Como executar

Abra o arquivo `index.html` diretamente no navegador ou execute um servidor local:

```bash
python3 -m http.server 8000
```

Depois, acesse `http://localhost:8000`.

## Banco de dados das respostas

O quiz já está configurado para usar o Firebase Firestore no projeto `quiz-ia-3d`.

### Configuração no Firebase Console

1. Acesse o projeto [quiz-ia-3d](https://console.firebase.google.com/project/quiz-ia-3d).
2. Em **Firestore Database**, crie o banco de dados na região mais próxima.
3. Em **Authentication > Sign-in method**, habilite:
   - **Anônimo**
   - **E-mail/senha**
4. Em **Authentication > Users**, cadastre o e-mail e a senha da professora.
5. Publicar as regras abaixo no Firestore para permitir que alunos enviem uma nota e que usuárias autenticadas por e-mail gerenciem o painel:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /submissions/{submissionId} {
      allow create: if request.auth != null
        && request.resource.data.quiz == 'ia-mat2'
        && request.resource.data.answers is list
        && request.resource.data.score is number
        && request.resource.data.total is number;

      allow read, update, delete:
        if request.auth != null
        && request.auth.token.firebase.sign_in_provider != 'anonymous';
    }
  }
}
```

Recarregue o quiz após concluir essas etapas. A coleção `submissions` será criada automaticamente no primeiro envio.
