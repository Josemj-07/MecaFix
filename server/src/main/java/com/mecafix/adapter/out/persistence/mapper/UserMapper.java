package com.mecafix.adapter.out.persistence.mapper;

import com.mecafix.adapter.out.persistence.entity.UserJpaEntity;
import com.mecafix.domain.model.entity.person.authentication.User;
import com.mecafix.domain.model.valueobject.Email;

public class UserMapper {
    public static User toDomain(UserJpaEntity user) {
        return User.reBuild(user.getId(), new Email(user.getEmail()), user.getPasswordHash(), user.getName(), user.getRole());
    }
    public static UserJpaEntity toPersistence(User user) {
        return new UserJpaEntity(user.getId(), user.getEmail().address(), user.getPasswordHash(), user.getName(), user.getRole());
    }
}
