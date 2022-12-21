import { Auth } from 'aws-amplify';

export default function retrieveUser() {
/*    Auth.currentSession()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
}
*/    Auth.currentAuthenticatedUser({
        bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      })
        .then((user) => console.log(user))
        .catch((err) => console.log(err));
}

export async function getUser2() {
    try {
        const user = await Auth.currentAuthenticatedUser({
            bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
          })
          //localStorage.setItem('user', user.attributes.email)
          return user.attributes.email
    } catch (error) {
        console.log('error getting user:', error);
    }
}

//https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#account-recovery-verification