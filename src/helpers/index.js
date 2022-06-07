export const getUsersMap = user => {
    return {
      ...user,
      _id: user.id,
      email: user.email,
      userName: user.userName,
    };
  };