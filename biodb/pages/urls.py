from django.urls import path

from . import views

urlpatterns = [
    # Homepage
    path('', views.index_page, name='index_page'),
    path('contact', views.contact_page, name='contact_page'),

    # Gateway
    path('register', views.register_page, name='register_page'),
    path('register/success', views.register_success_page, name='register_success_page'),
    path('login', views.login_page, name='login_page'),
    path('logout', views.logout_page, name='logout_page'),

    #Dashboard
    path('dashboard', views.dashboard_page, name='dashboard_page'),
    path('user-profile/update', views.profile_update_page, name='update_user'),
    path('user-profile/retrieve', views.profile_retrieve_page, name='retrieve_user')
]
