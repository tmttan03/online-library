from django.urls import path
from .api import (
    Users,
    User,
    Login,
    Logout,
    Register,
)

urlpatterns = [
    #/api/users/ - Get all the users
    path('', Users.as_view({
        'get': 'get',
    }), name="users_list"),

    #/api/users/auth/- Get specific authenticated user
    path('auth/', User.as_view({
        'get': 'get',
        'post': 'update',
    }), name="user_detail"),

    #/api/users/<id>/ - Get specific user by id
    path('<int:id>/', User.as_view({
        'get': 'get_by_id',
    }), name="user_by_id"),

    #/api/users/register/ - Register Route
    path('register/', Register.as_view(), name="register"),

    #/api/users/login/ - Login Route
    path('login/', Login.as_view(), name="login"),

    #/api/users/logout/ - Logout Route
    path('logout/', Logout.as_view(), name="logout"),
]
