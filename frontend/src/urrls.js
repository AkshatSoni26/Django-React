// const base = 'http://localhost:8000'

const base = 'http://13.51.161.12'


export const backend_urls = {
    run: `${base}/server/`,
    check_user: `${base}/server/login`,
    register_user: `${base}/server/register`,
    prev_submissions: `${base}/server/submissions`,
}


export const frontend_urls ={
    home:'/',
    login: '/login',
    register: '/register',
}