// import { useEffect, useState  } from 'react';
// import { handleResponse, handleError } from './utils';
// import axios from 'axios';



// const api = axios.create({
//   baseURL: '/',
// });

// const prnew = axios.create({
//   baseURL: 'http://127.0.0.1:8000/'
// })

// // const headers = {
// //   headers: {
// //     'X-CSRFToken': csrfToken
// //   },
// // };

// export async function sso_authentication(data: any) {
//   const [csrfToken, setCsrfToken] = useState<string>('');

//   useEffect(() => {
//     const token = document.getElementsByName('csrfmiddlewaretoken')[0]?.getAttribute('content') || '';
//     setCsrfToken(token);
//   }, []);

//   try {
//     await new Promise<void>((resolve) => {
//       if (csrfToken) resolve();
//     });

//     const headers = {
//       headers: {
//         'X-CSRFToken': csrfToken
//       },
//     };

//     const response = await prnew.post(
//       'sso/authentication/google-oauth2/',
//       data,
//       headers
//     );

//     return handleResponse(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }

// // export async function sso_authentication(data: any) {
// //   try {
// //     const response = await prnew.post(
// //       'sso/authentication/google-oauth2/',
// //       data,
// //       headers
// //     );
// //     return handleResponse(response);
// //   } catch (error) {
// //     return handleError(error);
// //   }
// // }

// export async function sso_complete_callback(data: any) {
//   try {
//     const response = await api.post(
//       'sso/complete/google-oauth2/',
//       data,
//       // headers
//     );
//     return handleResponse(response);
//   } catch (error) {
//     return handleError(error);
//   }
// }
