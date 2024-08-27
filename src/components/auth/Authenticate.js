import { ref } from 'vue';

const authStatus = ref(!!localStorage.getItem('token'))
const role = ref('');
const userid = ref(0);

export function isAuthenticated(){
    return authStatus.value;
}

export function login(token){
    console.log("login performed");
    localStorage.setItem('token',token);

    authStatus.value = true;
}

export function addUserRole(status){
    role.value = status;
}

export function addUserID(status){
    userid.value = status;
}

export function userId(){
    return userid.value;
}

export function userrole(){
    return role.value;
}

export function logout() {
    localStorage.removeItem('token');
    authStatus.value = false;
}


export {authStatus , role, userid};