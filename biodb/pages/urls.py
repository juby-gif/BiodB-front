from django.urls import path

from . import views

urlpatterns = [
#************************************Homepage*******************************************#
    path('', views.index_page, name='index_page'),
    path('contact', views.contact_page, name='contact_page'),

#************************************Gateway********************************************#
    path('register', views.register_page, name='register_page'),
    path('register/success', views.register_success_page, name='register_success_page'),
    path('login', views.login_page, name='login_page'),
    path('logout', views.logout_page, name='logout_page'),

#************************************Dashboard******************************************#
    path('dashboard', views.dashboard_page, name='dashboard_page'),

#************************************User-Profile***************************************#
    path('user-profile/update', views.profile_update_page, name='update_user'),
    path('user-profile/retrieve', views.profile_retrieve_page, name='retrieve_user'),

#************************************Sensor*********************************************#
    path('sensor/step-count-detail-page', views.step_count_sensor_detail_page, name='step_count_detail_page'),
    path('sensor/walking_running-detail-page', views.walking_running_sensor_detail_page, name='walking_running_detail_page'),
]
