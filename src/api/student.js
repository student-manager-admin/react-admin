import { AxiosGet, AxiosPOST } from './index'
export const getStudentList = () => {
    return AxiosGet('/list')
}