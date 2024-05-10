// 保存用户信息到本地 session
const saveUserInfoToSession = (user: User) => {
    sessionStorage.setItem('user', JSON.stringify(user));
};

// 从本地 session 获取用户信息
const getUserInfoFromSession = (): User | null => {
    const userInfo = sessionStorage.getItem('user');
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return null;
};

// 从本地 session 删除用户信息
const deleteUserInfoFromSession = () => {
    sessionStorage.removeItem('user');
};