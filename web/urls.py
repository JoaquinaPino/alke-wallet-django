from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views

urlpatterns = [
    path('login/', LoginView.as_view(template_name='web/login.html'), name='login'),
    
    path('', views.index, name='index'),
    path('menu/', views.menu, name='menu'),
    path('deposit/', views.deposit, name='deposit'),
    path('transactions/', views.transactions, name='transactions'),
    path('sendmoney/', views.sendmoney, name='sendmoney'),
    path('logout/', LogoutView.as_view(next_page='index'), name='logout'),
]