import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';
import firebase from '@/services/firebaseConnection';


export const authOptions = {
    providers: [
        GitHubProvider({
          clientId: process.env.GITHUB_ID as string,
          clientSecret: process.env.GITHUB_SECRET as string,
        }),

    ],
    callbacks: {
      async jwt({ token, account, profile, session }: any) {
        return token
      },
      async session({session, token}: any) {
        try {
          const lastDonate = await firebase.firestore().collection('users')
          .doc(token.sub)
          .get()
          .then((snapshot)=> {
            if(snapshot.exists){
              return snapshot.data()?.lastDonate.toDate();
            }else{
              return null;
            }
          })
          return {
            ...session,
            id: token.sub,
            vip: lastDonate ? true : false,
            lastDonate: lastDonate
          }
        } catch (error) {
          return {
            ...session,
            id: null,
            vip: false,
            lastDonate: null
          }
        }
      },
      async signIn({user, account, profile}: any){
        const {email} = user;
        try {
          return true;
        } catch (error) {
          console.log("Deu Erro: ", error);
          return false;
        }
      }
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };