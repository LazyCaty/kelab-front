/**
 * 用于给请求头加token
 * @param header 为空
 * @returns {{} & any}
 */
export function getTokenHeader(header) {
    let _header = Object.assign({}, header);
    _header = {Authorization: localStorage.Authorization};
    return _header;
}