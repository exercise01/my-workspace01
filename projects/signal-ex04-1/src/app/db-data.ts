export const COURSES =[
{
    id:1,
    description:"angular-core",
    iconUrl: '',
    longDescription:"The most important part for angular-core", 
    category: 'BEGINER'
},
{
    id:2,
    description:"angular-form",
    iconUrl: '',
    longDescription:"The most important part for angular-form", 
    category: 'ADVANCE'
}

]

export const USERS = {
    1: {
      id: 1,
      email: 'test@angular-university.io',
      password: 'test',
      //pictureUrl: 'https://lh3.googleusercontent.com/-1pUNnTB3vaA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdn4uEc0ti8YE4Uuw6_Kz04tVe2Mg.CMID/s32-c/photo.jpg'
    }
  
  };

  export function authenticate(email: string, password: string) {

    const user: any = Object.values(USERS).find(user => user.email === email);
  
    if (user && user.password == password) {
      return user;
    } else {
      return undefined;
    }
  
  }
  