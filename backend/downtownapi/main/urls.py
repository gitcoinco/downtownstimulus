from django.urls import path, include
from .views import *

urlpatterns = [
    path('', RootView.as_view(), name='root-view'),

    path('users/', UserList.as_view(), name='user-list'),
    path('user/<int:pk>/', UserListDetail.as_view(), name='user-detail'),

    path('business/', BusinessList.as_view(), name='business-list'),
    path('business/<int:pk>/', BusinessListDetail.as_view(), name='business-detail'),

    path('donations/', DonationList.as_view(), name='donation-list'),
    path('donation/<int:pk>/', DonationListDetail.as_view(), name='donation-detail'),
]